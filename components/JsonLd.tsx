interface JsonLdProps {
  schema: Record<string, unknown>;
}

/**
 * Injects a JSON-LD script tag for structured data (schema.org).
 * Helps generative AI engines and search crawlers understand page entities.
 */
export default function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
