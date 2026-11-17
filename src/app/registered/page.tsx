import type { Metadata } from 'next';
import { SimplePage } from '@/components/SimplePage';
import { contact } from '@/content/site';

// Landing page for the sign-up form when it is posted without JavaScript.
export const metadata: Metadata = { title: 'Sign-up | Samridhi.si', robots: { index: false, follow: true } };

const copy = {
  ok: { title: "You're on the list", body: "Thank you. We'll get in touch as soon as Samridhi opens near you." },
  invalid: {
    title: 'Something was missing',
    body: 'Please go back and check your name, a 10-digit mobile number starting with 6, 7, 8 or 9, and the consent box.'
  },
  error: { title: "We couldn't save that", body: `Please try again in a few minutes, or write to us at ${contact.email}.` }
} as const;

export default async function Registered({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status } = await searchParams;
  const c = copy[(status as keyof typeof copy) in copy ? (status as keyof typeof copy) : 'ok'];
  return (
    <SimplePage title={c.title} intro={c.body}>
      <a href="/#register" className="inline-flex min-h-12 items-center self-start rounded-full bg-green px-6 font-bold text-white no-underline hover:text-white">
        {status === 'ok' || !status ? 'Back to Samridhi' : 'Back to the form'}
      </a>
    </SimplePage>
  );
}
