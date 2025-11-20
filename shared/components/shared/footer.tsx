import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin, Youtube, Linkedin } from 'lucide-react';

import { Container } from './container';
import { cn } from '@/shared/lib/utils';

interface Props {
  className?: string;
}

export const Footer: React.FC<Props> = ({ className }) => {
  return (
    <footer className={cn('bg-primary py-8 md:py-10 shadow-lg shadow-black/5 mt-10 text-white', className)}>
      <Container>
        <div className="flex flex-col items-center gap-8 md:gap-10">
          <div className="flex items-center gap-4 text-center">
            <img src="/logo.png" alt="Paul Pizza" className="w-10 h-10" />
            <h2 className="text-2xl sm:text-3xl font-black uppercase">Paul Pizza</h2>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center w-full gap-4 sm:gap-8 lg:gap-12 text-center sm:text-left">
            <a href="tel:+375291234567" className="flex items-center justify-center sm:justify-start gap-3 hover:text-white transition-colors">
              <Phone className="text-white/90" size={20} />
              <span className="text-white/80 text-base sm:text-lg whitespace-nowrap">+375 (29) 123-45-67</span>
            </a>

            <a href="mailto:info@paulpizza.by" className="flex items-center justify-center sm:justify-start gap-3 hover:text-white transition-colors">
              <Mail className="text-white/90" size={20} />
              <span className="text-white/80 text-base sm:text-lg whitespace-nowrap">info@paulpizza.by</span>
            </a>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Минск+ул.+Якуба+Коласа+6"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center sm:justify-start gap-3 hover:text-white transition-colors"
            >
              <MapPin className="text-white/90" size={20} />
              <span className="text-white/80 text-base sm:text-lg whitespace-nowrap">г. Минск, ул. Якуба Коласа, 6</span>
            </a>
          </div>

          <div className="flex flex-col items-center gap-4">
            <p className="text-white/80 text-center text-sm sm:text-base">Следите за новостями и акциями в соцсетях</p>
            <div className="flex flex-wrap justify-center gap-5 sm:gap-6">
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                <Facebook size={24} />
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                <Instagram size={24} />
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                <Twitter size={24} />
              </Link>
              <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                <Youtube size={24} />
              </Link>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                <Linkedin size={24} />
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm text-white/80 text-center">
            <Link href="/" className="hover:text-white transition-colors">
              О компании
            </Link>
            <Link href="/" className="hover:text-white transition-colors">
              Доставка
            </Link>
            <Link href="/" className="hover:text-white transition-colors">
              Политика конфиденциальности
            </Link>
            <Link href="/" className="hover:text-white transition-colors">
              Условия использования
            </Link>
          </div>

          <div className="text-white/80 text-xs sm:text-sm text-center">
            © {new Date().getFullYear()} Paul Pizza. Все права защищены.
          </div>
        </div>
      </Container>
    </footer>
  );
};

