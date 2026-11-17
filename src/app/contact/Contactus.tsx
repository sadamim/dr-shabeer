// app/contact/page.tsx
'use client';

import { useState, ChangeEvent } from 'react';
import {
    LuCalendarCheck,
    LuCircleAlert,
    LuCircleCheck,
    LuClipboardList,
    LuExternalLink,
    LuLoaderCircle,
    LuMail,
    LuMapPin,
    LuMessageCircle,
    LuPhone,
    LuSend,
} from 'react-icons/lu';
import BariatricBanner from '@/components/BreadcrumbBanner';
import { SITE } from '@/lib/site';

// Same service list (and values) the enquiry email has always received
const services = [
    { label: 'Diarrhea', value: 'Diarrhea' },
    { label: 'Gastritis', value: 'Gastritis' },
    { label: 'Bariatric Surgery', value: 'Bariatric Surgery' },
    { label: 'Obesity', value: 'Obesity' },
    { label: 'Laser Surgery', value: 'Laser Surgery' },
    { label: 'Gastric Balloon', value: 'Gastric Balloon' },
    { label: 'Rectal Bleeding', value: 'Rectal Bleeding' },
    { label: 'Endoscopic Surgery', value: 'Endoscopic Surgery' },
    { label: 'Incisional Hernia', value: 'Incisional Hernia' },
    { label: 'Inguinal Hernia', value: 'Inguinal Hernia' },
    { label: 'Anal Fissure, Anal Fistula', value: 'Anal Fissure, Anal Fistula' },
    { label: 'Abdominal Pain', value: 'Abdominal Pain' },
    { label: 'Surgery For Reflux Disease', value: 'Surgery For Reflux Disease' },
    { label: 'Irritable Bowel Syndrome', value: 'Irritable Bowel Syndrome' },
    { label: 'Cancer Treatment', value: 'Cancer Treatment' },
    { label: 'Stem Cell Therapy', value: 'Stem Cell Therapy' },
    { label: 'Robotic Surgery', value: 'Robotic Surgery' },
    { label: 'Gallstones', value: 'Gallstones' },
    { label: 'Piles', value: 'Piles' },
    { label: 'Gastroesophageal Reflux Disease', value: 'Gastroesophageal Reflux Disease' },
    { label: 'Laparoscopic Surgery', value: 'Laparoscopic Surgery' },
];

const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.address)}`;

type Status = 'idle' | 'sending' | 'success' | 'error';

const emptyForm = { name: '', email: '', phone: '', service: '', message: '' };

export default function ContactPages() {
    const [formData, setFormData] = useState(emptyForm);
    const [status, setStatus] = useState<Status>('idle');

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (status === 'success' || status === 'error') setStatus('idle');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const res = await fetch('/api/sendEmail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus('success');
                setFormData(emptyForm);
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setStatus('error');
        }
    };

    const methods = [
        {
            icon: LuCalendarCheck,
            title: 'Book an appointment',
            text: `Book online at ${SITE.appointmentHospital}`,
            href: SITE.appointmentHref,
            cta: 'Book online',
            external: true,
        },
        {
            icon: LuPhone,
            title: 'Call the clinic',
            text: SITE.phoneDisplay,
            href: SITE.phoneHref,
            cta: 'Call now',
        },
        {
            icon: LuMessageCircle,
            title: 'WhatsApp',
            text: SITE.phoneDisplay,
            href: SITE.whatsappHref,
            cta: 'Start chat',
            external: true,
        },
        {
            icon: LuMail,
            title: 'Email',
            text: SITE.email,
            href: `mailto:${SITE.email}`,
            cta: 'Send email',
        },
    ];

    return (
        <>
            <BariatricBanner title="Contact Us" imageSrc="/img/bannerslider/Bariatric Surgery 2.webp" />

            <section className="ds-section ds-section--soft ds-contact" aria-labelledby="contact-title">
                <div className="ds-container ds-contact__grid">
                    {/* Contact options */}
                    <div>
                        <p className="ds-eyebrow">Get in touch</p>
                        <h2 id="contact-title" className="ds-h2">Have a question? We&apos;re here to help.</h2>
                        <p className="ds-lead">
                            Book an appointment, call or WhatsApp the clinic, or send a message using the form.
                        </p>

                        <ul className="ds-contact__methods">
                            {methods.map(({ icon: Icon, title, text, href, cta, external }) => (
                                <li key={title} className="ds-card ds-card--hover ds-contact__method">
                                    <span className="ds-icon-badge"><Icon aria-hidden="true" /></span>
                                    <div>
                                        <h3>{title}</h3>
                                        <p>{text}</p>
                                        <a
                                            href={href}
                                            className="ds-link"
                                            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                        >
                                            {cta}
                                            {external ? <LuExternalLink aria-hidden="true" /> : null}
                                            <span className="ds-sr-only">: {title}</span>
                                        </a>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="ds-card ds-contact__address">
                            <span className="ds-icon-badge"><LuMapPin aria-hidden="true" /></span>
                            <div>
                                <h3>Clinic address</h3>
                                <address>{SITE.address}</address>
                                <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="ds-link">
                                    Open in Google Maps <LuExternalLink aria-hidden="true" />
                                </a>
                            </div>
                        </div>

                        <a
                            href={SITE.requestAppointmentHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ds-contact__request"
                        >
                            <LuClipboardList aria-hidden="true" />
                            Prefer to request a slot? <strong>Request an appointment</strong>
                            <LuExternalLink aria-hidden="true" />
                        </a>
                    </div>

                    {/* Enquiry form */}
                    <div className="ds-card ds-contact__form">
                        <h2 className="ds-h3">Send us a message</h2>
                        <p className="ds-muted" style={{ fontSize: '0.92rem' }}>
                            Fields marked <span aria-hidden="true">*</span><span className="ds-sr-only">with an asterisk</span> are required.
                            Please don&apos;t include urgent medical concerns — call the clinic instead.
                        </p>

                        <form onSubmit={handleSubmit} noValidate={false}>
                            <div className="ds-form-grid">
                                <div className="ds-field">
                                    <label htmlFor="contact-name">Name <span aria-hidden="true">*</span></label>
                                    <input id="contact-name" type="text" name="name" className="ds-input" autoComplete="name" value={formData.name} onChange={handleChange} required />
                                </div>
                                <div className="ds-field">
                                    <label htmlFor="contact-email">Email address <span aria-hidden="true">*</span></label>
                                    <input id="contact-email" type="email" name="email" className="ds-input" autoComplete="email" value={formData.email} onChange={handleChange} required />
                                </div>
                                <div className="ds-field">
                                    <label htmlFor="contact-phone">Phone number</label>
                                    <input id="contact-phone" type="tel" name="phone" className="ds-input" autoComplete="tel" value={formData.phone} onChange={handleChange} />
                                </div>
                                <div className="ds-field">
                                    <label htmlFor="contact-service">Service <span aria-hidden="true">*</span></label>
                                    <select id="contact-service" name="service" className="ds-select" value={formData.service} onChange={handleChange} required>
                                        <option value="" disabled>Select a service…</option>
                                        {services.map((s) => (
                                            <option key={s.value} value={s.value}>{s.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="ds-field ds-field--full">
                                    <label htmlFor="contact-message">Message <span aria-hidden="true">*</span></label>
                                    <textarea id="contact-message" name="message" className="ds-input" rows={5} value={formData.message} onChange={handleChange} required />
                                </div>
                            </div>

                            <button type="submit" className="ds-btn ds-btn--primary ds-contact__submit" disabled={status === 'sending'}>
                                {status === 'sending' ? (
                                    <><LuLoaderCircle className="ds-spin" aria-hidden="true" /> Sending…</>
                                ) : (
                                    <><LuSend aria-hidden="true" /> Send Message</>
                                )}
                            </button>

                            <div role="status" aria-live="polite">
                                {status === 'success' && (
                                    <p className="ds-alert ds-alert--success">
                                        <LuCircleCheck aria-hidden="true" /> Message sent successfully! The clinic will get back to you.
                                    </p>
                                )}
                                {status === 'error' && (
                                    <p className="ds-alert ds-alert--error">
                                        <LuCircleAlert aria-hidden="true" /> Sorry, your message could not be sent. Please try again or call {SITE.phoneDisplay}.
                                    </p>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}
