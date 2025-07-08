// app/contact/page.tsx
'use client';

import { useState, ChangeEvent } from 'react';
import BariatricBanner from '@/components/BreadcrumbBanner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapPin, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';

export default function ContactPages() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
    });

    const [status, setStatus] = useState('');

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
        { label: 'Surgery For Reflux Disease', value: 'refluxSurgery For Reflux Disease' },
        { label: 'Irritable Bowel Syndrome', value: 'Irritable Bowel Syndrome' },
        { label: 'Cancer Treatment', value: 'Cancer Treatment' },
        { label: 'Stem Cell Therapy', value: 'Stem Cell Therapy' },
        { label: 'Robotic Surgery', value: 'Robotic Surgery' },
        { label: 'Gallstones', value: 'Gallstones' },
        { label: 'Piles', value: 'Piles' },
        { label: 'Gastroesophageal Reflux Disease', value: 'Gastroesophageal Reflux Disease' },
        { label: 'Laparoscopic Surgery', value: 'Laparoscopic Surgery' }
    ];

    const serviceOptions = services.map(item => ({
        value: item.value,
        label: item.label
    }));

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSelectChange = (selectedOption: any) => {
        setFormData(prev => ({ ...prev, service: selectedOption?.value || '' }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('Sending...');

        try {
            const res = await fetch('/api/sendEmail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus('Message sent successfully!');
                setFormData({ name: '', email: '', phone: '', service: '', message: '' });
            } else {
                setStatus('Failed to send message.');
            }
        } catch (error) {
            console.error("Form submission error:", error);
            setStatus('An error occurred while sending the message.');
        }
    };
    return (
        <>
           

            <BariatricBanner title="Contact Us" imageSrc="/img/bannerslider/Bariatric Surgery 2.webp" />

            <section className="contact-section py-5">
                <div className="container">
                    <div className="row">
                        {/* Left Side - Contact Info */}
                        <div className="col-lg-5 col-md-12">
                            <div className="section-inner-header contact-inner-header mb-4">
                                <h6>Get in Touch</h6>
                                <h2>Have Any Question?</h2>
                            </div>

                            <div className="card contact-card mb-3">
                                <div className="card-body d-flex align-items-start">
                                    <div className="contact-icon me-3">
                                        <FontAwesomeIcon icon={faMapPin} size="lg" />
                                    </div>
                                    <div className="contact-details">
                                        <h4>Address</h4>
                                        <p>830 13 Main 3 Block Koramangala Bangalore 560034</p>
                                    </div>
                                </div>
                            </div>

                            <div className="card contact-card mb-3">
                                <div className="card-body d-flex align-items-start">
                                    <div className="contact-icon me-3">
                                        <FontAwesomeIcon icon={faPhone} size="lg" />
                                    </div>
                                    <div className="contact-details">
                                        <h4>Phone Number</h4>
                                        <p>+1 315 369 5943</p>
                                    </div>
                                </div>
                            </div>

                            <div className="card contact-card">
                                <div className="card-body d-flex align-items-start">
                                    <div className="contact-icon me-3">
                                        <FontAwesomeIcon icon={faEnvelope} size="lg" />
                                    </div>
                                    <div className="contact-details">
                                        <h4>Email Address</h4>
                                        <p>drshabeerahmed@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Contact Form */}
                        <div className="col-lg-7 col-md-12 d-flex">
                            <div className="card contact-form-card w-100">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Name</label>
                                                <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Email Address</label>
                                                <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Phone Number</label>
                                                <input type="text" name="phone" className="form-control" value={formData.phone} onChange={handleChange} />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Services</label>
                                                <Select
                                                    name="service"
                                                    options={serviceOptions}
                                                    value={serviceOptions.find(opt => opt.value === formData.service) || null}
                                                    onChange={handleSelectChange}
                                                    placeholder="Select Service..."
                                                    isSearchable
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label className="form-label">Message</label>
                                                <textarea name="message" className="form-control" value={formData.message} onChange={handleChange} required></textarea>
                                            </div>
                                            <div className="col-md-12">
                                                <button type="submit" className="btn btn-primary prime-btn w-100">Send Message</button>
                                                {status && <p className="mt-3">{status}</p>}
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <div className="contact-map mt-5">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3193.7301009561315!2d-76.13077892422932!3d36.82498697224007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89bae976cfe9f8af%3A0xa61eac05156fbdb9!2sBeachStreet%20USA!5e0!3m2!1sen!2sin!4v1669777904208!5m2!1sen!2sin"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Clinic Location Map"
                ></iframe>
            </div>
        </>
    );
}