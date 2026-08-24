export type EvidenceCardProps = {
  title: string;
  body?: string;
};

export function EvidenceCard({ title, body }: EvidenceCardProps) {
  return (
    <article className="card">
      <div className="mb-5 h-1.5 w-12 rounded-full bg-lime" />
      <h3 className="text-base font-semibold text-navy">{title}</h3>
      {body ? <p className="mt-3 text-sm leading-6 text-slate">{body}</p> : null}
    </article>
  );
}
