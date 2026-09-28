import { createFileRoute } from "@tanstack/react-router";
import { Stage } from "@/components/deck/Stage";

const title = "SPAL × Vista Alegre: Dos dados à Inês";
const description =
  "Apresentação interativa: duas porcelanas portuguesas, um percurso até à compra e as três jogadas que a SPAL pode fazer a seguir.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      <h1 className="sr-only">{title}</h1>
      <Stage />
    </main>
  );
}
