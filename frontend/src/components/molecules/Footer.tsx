import React from 'react';

const Footer: React.FC = () => {
  return (
    <div className="border-t border-border-light bg-bg-primary px-4 md:px-8 py-4 shrink-0">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-label-small text-text-tertiary">
        <p>© 2026 ImpactHire. All rights reserved.</p>
        <div className="flex items-center gap-6 flex-wrap justify-center">
          <a href="#" className="hover:text-text-primary transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-text-primary transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-text-primary transition-colors">
            Help Center
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;