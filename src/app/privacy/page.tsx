import type { Metadata } from 'next';
import { SimplePage } from '@/components/SimplePage';
import { agency, contact, org } from '@/content/site';

export const metadata: Metadata = {
  title: 'Privacy notice | Samridhi.si',
  description: 'How Samridhi, a CSR initiative of FAB5, collects and uses the details you share on samridhi.si.',
  alternates: { canonical: '/privacy' }
};

// Written for India's Digital Personal Data Protection Act, 2023. Have FAB5's legal team review it before launch.
const updated = '17 November 2026';

const H = ({ children }: { children: React.ReactNode }) => <h2 className="m-0 mt-4 text-2xl font-bold tracking-[-0.02em] text-plum">{children}</h2>;

export default function Privacy() {
  return (
    <SimplePage title="Privacy notice" intro={`Last updated ${updated}.`}>
      <p className="m-0">
        Samridhi is a CSR initiative of {org.name} (&quot;FAB5&quot;, &quot;we&quot;), {org.address}. FAB5 decides how the details you give us on samridhi.si are
        used, and is responsible for them.
      </p>

      <H>What we collect</H>
      <p className="m-0">When you fill in the sign-up form, we collect:</p>
      <ul className="m-0 flex list-disc flex-col gap-1.5 pl-6">
        <li>your name and mobile number;</li>
        <li>your town or village and district, if you give them;</li>
        <li>what you&apos;d like to do (join a programme, volunteer, partner or bring Samridhi to your village) and the programme you chose, if any;</li>
        <li>the date and time you signed up and your browser type, to help us spot spam.</li>
      </ul>

      <H>Why we collect it</H>
      <p className="m-0">
        Only to contact you about Samridhi: to tell you when a programme opens near you, to arrange volunteering, or to discuss a partnership. We do not use your
        details for advertising, and we never sell them or share them for marketing.
      </p>

      <H>Your consent</H>
      <p className="m-0">
        We use your details because you agree to it when you tick the box on the form. You can withdraw your consent at any time by writing to{' '}
        <a href={`mailto:${contact.email}`}>{contact.email}</a>. We will then stop contacting you and delete your details.
      </p>

      <H>Who handles your details</H>
      <p className="m-0">
        The Samridhi team at FAB5 reads sign-ups. {agency.name} ({agency.legalName}) builds and runs this website for FAB5. Your details are stored in a secure
        database (MongoDB Atlas) and sent to our team by email (Resend). These providers process them only on our instructions.
      </p>

      <H>How long we keep them</H>
      <p className="m-0">We keep your details while we may still need to contact you about Samridhi, and delete them when you ask us to or when they are no longer needed.</p>

      <H>Your rights</H>
      <p className="m-0">You can ask us to:</p>
      <ul className="m-0 flex list-disc flex-col gap-1.5 pl-6">
        <li>tell you what details we hold about you and how we use them;</li>
        <li>correct or complete them;</li>
        <li>delete them;</li>
        <li>nominate someone to act for you if you are unable to.</li>
      </ul>
      <p className="m-0">
        Write to <a href={`mailto:${contact.email}`}>{contact.email}</a> with the subject &quot;Samridhi privacy&quot;. If you are not satisfied with our reply, you can
        complain to the Data Protection Board of India.
      </p>

      <H>Children</H>
      <p className="m-0">If you are under 18, please ask a parent or guardian to fill in the form for you.</p>

      <H>Changes</H>
      <p className="m-0">If we change this notice, we will update it here and change the date at the top.</p>
    </SimplePage>
  );
}
