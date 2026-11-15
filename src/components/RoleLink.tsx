'use client';

import type { Role } from '@/content/site';

export type RolePick = { role?: Role; programme?: string };
export const ROLE_EVENT = 'samridhi:pick';

/** A link to the form that also preselects a role and/or programme. */
export function RoleLink({ pick, className, children }: { pick: RolePick; className?: string; children: React.ReactNode }) {
  return (
    <a
      href="#register"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent<RolePick>(ROLE_EVENT, { detail: pick }))}
    >
      {children}
    </a>
  );
}
