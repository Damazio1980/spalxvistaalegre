import { useEffect, useRef, useState, type FormEvent } from "react";
import { LoaderCircle, MessageCircleQuestion, Send, X } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { answerAudienceQuestion } from "@/lib/audience-question.functions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function AudienceQuestion() {
  const answerQuestion = useServerFn(answerAudienceQuestion);
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open) window.setTimeout(() => textareaRef.current?.focus(), 80);
  }, [open]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    const trimmed = question.trim();
    if (trimmed.length < 3 || loading) return;
    setLoading(true);
    setAnswer(null);
    setError(null);
    try {
      const result = await answerQuestion({ data: { question: trimmed } });
      setAnswer(result.answer);
      setError(result.error);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Não foi possível gerar a resposta.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
        className="h-7 w-7 rounded-full border border-navy/15 text-navy hover:bg-porcelain"
        aria-label="Pergunta da audiência"
        title="Pergunta da audiência"
      >
        <MessageCircleQuestion className="h-3.5 w-3.5" />
      </Button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-navy/80 p-4 backdrop-blur-sm sm:items-center"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="audience-question-title"
            className="deck-rise relative w-full max-w-[620px] border border-porcelain/20 bg-navy px-6 py-6 text-porcelain shadow-[var(--shadow-frame)] sm:px-8 sm:py-8"
          >
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 text-porcelain/70 hover:bg-porcelain/10 hover:text-porcelain"
              aria-label="Fechar"
            >
              <X />
            </Button>

            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-vaa">
              Assistente da apresentação
            </p>
            <h2 id="audience-question-title" className="mt-3 pr-10 text-3xl font-bold text-porcelain">
              Pergunta da audiência
            </h2>

            <form onSubmit={submit} className="mt-6">
              <label htmlFor="audience-question" className="sr-only">
                Pergunta
              </label>
              <Textarea
                ref={textareaRef}
                id="audience-question"
                value={question}
                maxLength={500}
                onChange={(event) => setQuestion(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    event.currentTarget.form?.requestSubmit();
                  }
                }}
                placeholder="Ex.: Porque é que a Vista Alegre vence no percurso de compra?"
                className="min-h-[104px] resize-none rounded-none border-porcelain/25 bg-porcelain/5 text-base text-porcelain shadow-none placeholder:text-porcelain/45 focus-visible:ring-vaa"
                disabled={loading}
              />
              <div className="mt-3 flex items-center justify-between gap-4">
                <span className="text-xs text-porcelain/45">{question.length}/500</span>
                <Button
                  type="submit"
                  disabled={question.trim().length < 3 || loading}
                  className="bg-vaa text-porcelain hover:bg-vaa/90"
                >
                  {loading ? <LoaderCircle className="animate-spin" /> : <Send />}
                  {loading ? "A preparar resposta…" : "Gerar resposta"}
                </Button>
              </div>
            </form>

            {(answer || error) && (
              <div
                aria-live="polite"
                className="mt-6 border-l-2 border-vaa pl-5 text-[15px] leading-relaxed"
              >
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-porcelain/45">
                  {error ? "Não foi possível responder" : "Resposta sugerida"}
                </p>
                <p className={error ? "text-porcelain/75" : "text-porcelain"}>{error ?? answer}</p>
              </div>
            )}
          </section>
        </div>
      )}
    </>
  );
}
