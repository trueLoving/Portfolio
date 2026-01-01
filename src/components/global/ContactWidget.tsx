import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useUserConfig } from '../../config/hooks';
import { useI18n } from '../../i18n/context';

interface ContactWidgetProps {
  open: boolean;
  onClose: () => void;
}

export default function ContactWidget({ open, onClose }: ContactWidgetProps) {
  const { t, locale } = useI18n();
  const userConfig = useUserConfig();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [company, setCompany] = useState(''); // honeypot
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // 初始化为 null，客户端挂载后再设置，避免 hydration mismatch
  const [mountedAt, setMountedAt] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (open && mountedAt === null) {
      setMountedAt(Date.now());
    }
  }, [open, mountedAt]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open, onClose]);

  if (!open) return null;

  const timeOnPageSec = mountedAt ? Math.round((Date.now() - mountedAt) / 1000) : 0;

  const disabled = loading || success;

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Simple client validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError(t('contact.validation.required'));
      return;
    }
    const emailOk = /.+@.+\..+/.test(email);
    if (!emailOk) {
      setError(t('contact.validation.emailInvalid'));
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, company, t: timeOnPageSec })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error((data && (data.message || data.error)) || t('contact.error'));
      }
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || t('contact.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[95] flex items-end md:items-center justify-end md:justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div ref={dialogRef} role="dialog" aria-modal="true" aria-label="Contact form" className="relative w-full md:max-w-lg bg-gray-900/95 text-white rounded-2xl shadow-2xl p-6 border border-white/10">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h3 className="text-xl font-semibold">{t('contact.title')}</h3>
            <p className="text-sm text-gray-300 mt-1">{t('contact.subtitle')}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white" aria-label="Close contact">
            ✕
          </button>
        </div>

        {success ? (
          <div className="mt-6 bg-green-600/10 border border-green-500/30 text-green-200 rounded-lg p-4">
            <p>{t('contact.success')} <span className="font-medium">{email}</span>{locale === 'zh-CN' ? t('contact.successSuffix') : '.'}</p>
          </div>
        ) : (
          <form className="mt-6 space-y-4" onSubmit={send}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-300">{t('contact.name')}</label>
                <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-white/40" placeholder={t('contact.name')} disabled={disabled} />
              </div>
              <div>
                <label className="text-sm text-gray-300">{t('contact.email')}</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-white/40" placeholder="you@example.com" disabled={disabled} />
              </div>
            </div>
            <div className="hidden">
              <label>Company</label>
              <input value={company} onChange={(e) => setCompany(e.target.value)} />
            </div>
            <div>
              <label className="text-sm text-gray-300">{t('contact.message')}</label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-white/40 resize-y" placeholder={t('contact.message')} disabled={disabled} />
            </div>
            {error && (
              <div className="text-red-300 text-sm bg-red-500/10 border border-red-500/30 rounded-md p-2">{error}</div>
            )}
            <div className="flex items-center justify-between">
              <button type="submit" disabled={disabled} className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? t('contact.sending') : t('contact.send')}
              </button>
              <a href={`mailto:${userConfig.contact.email}`} className="text-sm text-gray-300 hover:text-white underline underline-offset-2">Email me directly</a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
