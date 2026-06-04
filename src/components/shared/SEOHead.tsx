'use client';

import { useEffect } from 'react';
import { SITE_NAME, SITE_DESCRIPTION } from '../../lib/constants';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  type?: 'website' | 'article';
}

export function SEOHead({ title, description = SITE_DESCRIPTION, canonicalPath = '' }: SEOHeadProps) {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — Find Sports Watch Parties Near You`;

  useEffect(() => {
    document.title = fullTitle;
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.name = name;
        document.head.appendChild(el);
      }
      el.content = content;
    };
    setMeta('description', description);
    setMeta('og:title', fullTitle);
    setMeta('og:description', description);
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
  }, [fullTitle, description, canonicalPath]);

  return null;
}
