'use client'

import { useState } from "react";
import { FaEnvelope, FaLinkedin, FaMapMarkerAlt } from "react-icons/fa";
import { useForm, SubmitHandler } from "react-hook-form";
import emailjs from '@emailjs/browser';
import toast from "react-hot-toast";

interface IFormInput {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormInput>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const user = "tu.correo"; 
    const domain = "gmail.com"; 
    window.location.href = `mailto:${user}@${domain}`;
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsSubmitting(true);
    
    const loadingToast = toast.loading('Enviando mensaje...');
    
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      toast.dismiss(loadingToast); 
      toast.error("Error de configuración en el servidor.");
      setIsSubmitting(false);
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: data.name,
          reply_to: data.email,
          message: data.message,
        },
        publicKey
      );
      
      toast.dismiss(loadingToast);
      toast.success("¡Mensaje enviado con éxito!"); 
      reset();
    } catch (error) {
      console.error(error);
      toast.dismiss(loadingToast); 
      toast.error("Hubo un error al enviar el mensaje.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 px-6 w-full bg-background" id="contacto">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <span className="text-primary text-sm uppercase tracking-widest font-bold">Contacto</span>
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-white leading-tight">
              ¿Listo para empezar?
            </h2>
            <p className="text-neutral-400 text-lg leading-relaxed max-w-md">
              Actualmente estoy disponible para consultas de arquitectura y roles como desarrollador senior. Construyamos algo increíble juntos.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <button onClick={handleEmailClick} className="flex items-center gap-4 group w-fit text-left">
              <div className="p-4 bg-surface border border-white/5 rounded-2xl text-neutral-400 group-hover:text-primary group-hover:border-primary/30 transition-all duration-300">
                <FaEnvelope size={24} />
              </div>
              <p className="text-neutral-300 font-medium group-hover:text-white transition-colors">
                Enviame un correo
              </p>
            </button>

            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex items-center gap-4 group w-fit">
              <div className="p-4 bg-surface border border-white/5 rounded-2xl text-neutral-400 group-hover:text-primary group-hover:border-primary/30 transition-all duration-300">
                <FaLinkedin size={24} />
              </div>
              <p className="text-neutral-300 font-medium group-hover:text-white transition-colors">
                linkedin.com/in/tu-perfil
              </p>
            </a>

            <div className="flex items-center gap-4 group w-fit">
              <div className="p-4 bg-surface border border-white/5 rounded-2xl text-neutral-400 group-hover:text-primary group-hover:border-primary/30 transition-all duration-300">
                <FaMapMarkerAlt size={24} />
              </div>
              <p className="text-neutral-300 font-medium group-hover:text-white transition-colors">
                Resistencia, Chaco, Argentina
              </p>
            </div>
          </div>
        </div>

        <div className="bg-surface p-8 md:p-10 rounded-3xl border border-white/5 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-neutral-400 ml-1">Nombre</label>
              <input 
                {...register("name", { required: "El nombre es obligatorio" })}
                placeholder="Tu nombre"
                className={`w-full bg-white/5 border rounded-xl px-5 py-4 text-white placeholder-neutral-500 focus:outline-none focus:bg-white/10 transition-all duration-300 ${errors.name ? 'border-red-500' : 'border-white/10 focus:border-primary'}`}
              />
              {errors.name && <span className="text-red-500 text-xs ml-1">{errors.name.message}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-neutral-400 ml-1">Correo Electrónico</label>
              <input 
                {...register("email", { 
                  required: "El correo es obligatorio",
                  pattern: { value: /^\S+@\S+$/i, message: "Correo inválido" }
                })}
                placeholder="tu@email.com"
                className={`w-full bg-white/5 border rounded-xl px-5 py-4 text-white placeholder-neutral-500 focus:outline-none focus:bg-white/10 transition-all duration-300 ${errors.email ? 'border-red-500' : 'border-white/10 focus:border-primary'}`}
              />
              {errors.email && <span className="text-red-500 text-xs ml-1">{errors.email.message}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium text-neutral-400 ml-1">Mensaje</label>
              <textarea 
                {...register("message", { required: "Escribe un mensaje" })}
                rows={5}
                placeholder="¿En qué te puedo ayudar?"
                className={`w-full bg-white/5 border rounded-xl px-5 py-4 text-white placeholder-neutral-500 focus:outline-none focus:bg-white/10 transition-all duration-300 resize-none ${errors.message ? 'border-red-500' : 'border-white/10 focus:border-primary'}`}
              ></textarea>
              {errors.message && <span className="text-red-500 text-xs ml-1">{errors.message.message}</span>}
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className={`mt-4 w-full text-background font-bold text-lg py-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_-5px_rgba(34,211,238,0.4)] ${isSubmitting ? 'bg-primary/50 cursor-not-allowed' : 'bg-primary hover:bg-primary/90 hover:shadow-[0_0_30px_-5px_rgba(34,211,238,0.6)] hover:-translate-y-1'}`}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}