"use client";

import Link from "next/link";
import { ToggleDarkMode } from "../ToggleDarkMode";
import Image from "next/image";
import { usePathname } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path === "/" && pathname.startsWith("/articles")) return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-claude-cream/95 dark:bg-claude-dark-bg/95 backdrop-blur-md border-b border-claude-tan dark:border-claude-dark-border">
        <div className="claude-container">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <Image
                    className="rounded-full transition-transform duration-200 group-hover:scale-105"
                    src="/deta.png"
                    alt="profile image"
                    width={40}
                    height={40}
                  />
                  <div className="absolute inset-0 rounded-full bg-claude-accent opacity-0 group-hover:opacity-20 transition-opacity duration-200" />
                </div>
                <div className="block">
                  <h1 className="text-sm font-semibold text-claude-text-primary dark:text-claude-dark-text">
                    I Putu Deta Utama Putra
                  </h1>
                  <p className="text-xs text-claude-text-secondary dark:text-claude-dark-text/70 hidden sm:block">
                    JavaScript, Web & More
                  </p>
                </div>
              </Link>

              <nav className="hidden md:flex items-center space-x-1">
                <Link 
                  href="/" 
                  className={`claude-nav-link ${
                    isActive("/") ? "text-claude-accent" : ""
                  }`}
                >
                  Articles
                </Link>
                <Link 
                  href="/projects" 
                  className={`claude-nav-link ${
                    isActive("/projects") ? "text-claude-accent" : ""
                  }`}
                >
                  Projects
                </Link>
                <Link 
                  href="/about" 
                  className={`claude-nav-link ${
                    isActive("/about") ? "text-claude-accent" : ""
                  }`}
                >
                  About
                </Link>
                <Link 
                  href="/tag" 
                  className={`claude-nav-link ${
                    isActive("/tag") ? "text-claude-accent" : ""
                  }`}
                >
                  Tags
                </Link>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <Link 
                href="/search"
                className="p-2 rounded-lg hover:bg-claude-tan dark:hover:bg-claude-dark-surface transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5 text-claude-text-secondary dark:text-claude-dark-text"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </Link>
              <ToggleDarkMode />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-claude-cream/95 dark:bg-claude-dark-bg/95 backdrop-blur-md border-t border-claude-tan dark:border-claude-dark-border">
        <div className="flex items-center justify-around py-2">
          <Link 
            href="/" 
            className={`flex flex-col items-center py-1 px-3 transition-colors ${
              isActive("/") 
                ? "text-claude-accent" 
                : "text-claude-text-secondary dark:text-claude-dark-text hover:text-claude-accent"
            }`}
          >
            <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <span className="text-xs font-medium">Articles</span>
          </Link>
          <Link 
            href="/projects" 
            className={`flex flex-col items-center py-1 px-3 transition-colors ${
              isActive("/projects") 
                ? "text-claude-accent" 
                : "text-claude-text-secondary dark:text-claude-dark-text hover:text-claude-accent"
            }`}
          >
            <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <span className="text-xs font-medium">Projects</span>
          </Link>
          <Link 
            href="/about" 
            className={`flex flex-col items-center py-1 px-3 transition-colors ${
              isActive("/about") 
                ? "text-claude-accent" 
                : "text-claude-text-secondary dark:text-claude-dark-text hover:text-claude-accent"
            }`}
          >
            <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs font-medium">About</span>
          </Link>
          <Link 
            href="/tag" 
            className={`flex flex-col items-center py-1 px-3 transition-colors ${
              isActive("/tag") 
                ? "text-claude-accent" 
                : "text-claude-text-secondary dark:text-claude-dark-text hover:text-claude-accent"
            }`}
          >
            <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <span className="text-xs font-medium">Tags</span>
          </Link>
        </div>
      </nav>
    </>
  );
};