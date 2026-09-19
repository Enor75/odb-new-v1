import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { EstimateSummary } from '@/components/Estimator';

interface ContactFormProps {
  /** Résumé de l'estimation transmise par le calculateur (optionnel) */
  estimate: EstimateSummary | null;
}

const GUEST_OPTIONS = ['< 100', '100 – 300', '300 – 800', '800 +'];
const BUDGET_KEYS = ['under', 'mid', 'high', 'top', 'discuss'] as const;

/**
 * Formulaire de contact avancé — branché sur l'Edge Function Supabase
 * `send-contact-email`. Inclut les détails d'événement et, si utilisée,
 * l'estimation issue du calculateur.
 */
const ContactForm = ({ estimate }: ContactFormProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    venue: '',
    guests: '',
    eventType: '',
    budget: '',
    message: '',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          ...formData,
          estimateRange: estimate?.range ?? '',
          estimateDetail: estimate?.detail ?? '',
        },
      });

      if (error) throw error;

      toast({ title: t.contactPage.form.success });
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventDate: '',
        venue: '',
        guests: '',
        eventType: '',
        budget: '',
        message: '',
      });
    } catch {
      toast({
        title: t.contactPage.form.error,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const labelClass = 'font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/50';
  const inputClass =
    'w-full rounded-none border-0 border-b border-foreground/15 bg-transparent py-3 text-base text-foreground outline-none transition-colors duration-300 placeholder:text-foreground/30 focus:border-primary';
  const selectClass = `${inputClass} appearance-none cursor-pointer`;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
      {/* Résumé d'estimation (si le calculateur a été utilisé) */}
      {estimate && (
        <div className="border border-primary/40 bg-primary/5 p-5">
          <p className={labelClass}>{t.contactPage.form.estimateLabel}</p>
          <p className="mt-2 font-serif text-2xl font-light text-primary">{estimate.range}</p>
          <p className="mt-1 font-mono text-xs text-foreground/60">{estimate.detail}</p>
        </div>
      )}

      <div className="grid gap-10 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className={labelClass}>
            {t.contactPage.form.name}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={labelClass}>
            {t.contactPage.form.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-10 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className={labelClass}>
            {t.contactPage.form.phone}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="eventDate" className={labelClass}>
            {t.contactPage.form.eventDate}
          </label>
          <input
            id="eventDate"
            name="eventDate"
            type="date"
            value={formData.eventDate}
            onChange={handleChange}
            className={`${inputClass} font-mono`}
          />
        </div>
      </div>

      <div className="grid gap-10 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="venue" className={labelClass}>
            {t.contactPage.form.venue}
          </label>
          <input
            id="venue"
            name="venue"
            type="text"
            value={formData.venue}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="guests" className={labelClass}>
            {t.contactPage.form.guestsLabel}
          </label>
          <select
            id="guests"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            className={selectClass}
          >
            <option value="" className="bg-background text-foreground">—</option>
            {GUEST_OPTIONS.map((g) => (
              <option key={g} value={g} className="bg-background text-foreground">
                {g}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-10 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="eventType" className={labelClass}>
            {t.contactPage.form.eventType}
          </label>
          <select
            id="eventType"
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            className={selectClass}
          >
            <option value="" className="bg-background text-foreground">—</option>
            {Object.values(t.contactPage.estimator.labels.typeLabels).map((label) => (
              <option key={label} value={label} className="bg-background text-foreground">
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="budget" className={labelClass}>
            {t.contactPage.form.budget}
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className={selectClass}
          >
            <option value="" className="bg-background text-foreground">—</option>
            {BUDGET_KEYS.map((key) => (
              <option
                key={key}
                value={t.contactPage.form.budgetLabels[key]}
                className="bg-background text-foreground"
              >
                {t.contactPage.form.budgetLabels[key]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className={labelClass}>
          {t.contactPage.form.message}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className={`${inputClass} resize-none`}
        />
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center border border-primary bg-transparent px-10 py-4 font-mono text-[11px] uppercase tracking-[0.25em] text-foreground transition-colors duration-300 hover:bg-primary hover:text-primary-foreground disabled:opacity-50"
        >
          {isSubmitting ? t.contactPage.form.sending : t.contactPage.form.send}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
