"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

/**
 * Telefone brasileiro com ou sem máscara:
 * (11) 92553-3716 · 11925533716 · +55 11 92553-3716 · 1132553716
 */
const phoneRegex =
  /^(?:\+?55[\s.-]?)?(?:\(?[1-9]\d\)?[\s.-]?)?(?:9[\s.-]?)?\d{4}[\s.-]?\d{4}$/;

const contactSchema = z.object({
  nome: z.string().trim().min(2, "Digite o seu nome completo"),
  telefone: z
    .string()
    .trim()
    .regex(phoneRegex, "Digite um telefone válido com DDD")
    .refine(
      (value) => value.replace(/\D/g, "").length >= 10,
      "Digite um telefone válido com DDD"
    ),
  email: z.string().trim().email("Digite um e-mail válido"),
  mensagem: z.string().trim().min(10, "Conte brevemente a sua situação"),
  // Honeypot anti-spam — humanos nunca veem nem preenchem este campo.
  website: z.string().optional(),
});

type ContactValues = z.infer<typeof contactSchema>;

/**
 * Formulário de contato que converte a mensagem em uma conversa de WhatsApp
 * pré-preenchida. Nenhum dado é enviado ou armazenado em servidor.
 */
export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
  });

  async function onSubmit(values: ContactValues) {
    // Pequena latência simulada para feedback de envio perceptível
    await new Promise((resolve) => setTimeout(resolve, 900));

    // Honeypot preenchido: provável bot — descarta em silêncio com sucesso fake
    if (values.website) {
      toast.success("Tudo certo! Abrindo o WhatsApp com a sua mensagem.");
      reset();
      return;
    }

    const message = `Olá Dra. Fernanda! Me chamo ${values.nome}. ${values.mensagem} — Contatos: ${values.telefone} · ${values.email}`;
    const whatsappBase =
      siteConfig.whatsappUrl.split("?")[0] ?? "https://wa.me/5511925533716";
    const url = `${whatsappBase}?text=${encodeURIComponent(message)}`;

    // Nota: passar "noopener" como feature faz window.open retornar null
    // mesmo em sucesso — por isso o opener é cortado manualmente.
    const opened = window.open(url, "_blank");
    if (opened) {
      opened.opener = null;
    } else {
      // Pop-up bloqueado — navega na mesma aba como fallback
      window.location.href = url;
    }

    toast.success("Tudo certo! Abrindo o WhatsApp com a sua mensagem.");
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-7">
      <div>
        <Label htmlFor="contato-nome" className="mb-2 block">
          Nome
        </Label>
        <Input
          id="contato-nome"
          type="text"
          autoComplete="name"
          placeholder="Seu nome completo"
          aria-invalid={errors.nome ? true : undefined}
          aria-describedby={errors.nome ? "contato-nome-erro" : undefined}
          {...register("nome")}
        />
        {errors.nome && (
          <p id="contato-nome-erro" role="alert" className="mt-1.5 text-xs text-red-700">
            {errors.nome.message}
          </p>
        )}
      </div>

      <div className="grid gap-7 md:grid-cols-2">
        <div>
          <Label htmlFor="contato-telefone" className="mb-2 block">
            Telefone / WhatsApp
          </Label>
          <Input
            id="contato-telefone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(11) 90000-0000"
            aria-invalid={errors.telefone ? true : undefined}
            aria-describedby={errors.telefone ? "contato-telefone-erro" : undefined}
            {...register("telefone")}
          />
          {errors.telefone && (
            <p
              id="contato-telefone-erro"
              role="alert"
              className="mt-1.5 text-xs text-red-700"
            >
              {errors.telefone.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="contato-email" className="mb-2 block">
            E-mail
          </Label>
          <Input
            id="contato-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="voce@email.com"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "contato-email-erro" : undefined}
            {...register("email")}
          />
          {errors.email && (
            <p
              id="contato-email-erro"
              role="alert"
              className="mt-1.5 text-xs text-red-700"
            >
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="contato-mensagem" className="mb-2 block">
          Mensagem
        </Label>
        <Textarea
          id="contato-mensagem"
          rows={4}
          placeholder="Conte brevemente a sua situação…"
          aria-invalid={errors.mensagem ? true : undefined}
          aria-describedby={errors.mensagem ? "contato-mensagem-erro" : undefined}
          {...register("mensagem")}
        />
        {errors.mensagem && (
          <p
            id="contato-mensagem-erro"
            role="alert"
            className="mt-1.5 text-xs text-red-700"
          >
            {errors.mensagem.message}
          </p>
        )}
      </div>

      {/* Honeypot — invisível para pessoas, atrativo para bots */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="contato-website">Não preencha este campo</label>
        <input
          id="contato-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 aria-hidden strokeWidth={1.5} className="animate-spin" />
            <span>Enviando…</span>
          </>
        ) : (
          <>
            <Send aria-hidden strokeWidth={1.5} />
            <span>Enviar mensagem</span>
          </>
        )}
      </Button>

      <p className="text-[0.6875rem] leading-relaxed text-slate/70">
        Seus dados são usados apenas para responder ao seu contato. Nenhuma
        informação é armazenada neste site.
      </p>
    </form>
  );
}
