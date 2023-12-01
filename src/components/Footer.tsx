import { useTheme } from 'next-themes'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { GitHub, Twitter, Send } from 'react-feather'
import { useSelector } from '~/src/store/store'

export default function Footer() {
  const blockchainState = useSelector((state) => state.blockchain)
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="border-t dark:border-gray-800 mt-12 py-10 max-w-full">
      <div className="container">
        <div className="flex flex-col md:flex-row items-start px-4">
          <div className="flex-grow">
            <div>
              {resolvedTheme === "dark" ? (
                <img
                  className="hidden lg:block h-8 w-auto"
                  src="/logo-text-dark.svg"
                />
              ) : (
                <img
                  className="hidden lg:block h-8 w-auto"
                  src="/logo-text.svg"
                />
              )}
            </div>
            <div className="text-gray-400 dark:text-gray-500 font-medium mt-4 text-sm">
              © 2023 ZilStream. All rights reserved
            </div>
          </div>
          <div>
            <div className="flex items-center gap-5 justify-end text-gray-500 dark:text-gray-400">
              {blockchainState.blockHeight && (
                <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mr-3">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full" />{" "}
                  Latest block{" "}
                  <a
                    href={`https://viewblock.io/zilliqa/block/${blockchainState.blockHeight}`}
                    target="_blank"
                    className="font-medium"
                  >
                    {blockchainState.blockHeight}
                  </a>
                </div>
              )}
              <a href="https://t.me/zilstream">
                <Send size={20} />
              </a>
              <a href="https://twitter.com/zilstream">
                <Twitter size={20} />
              </a>
              <a href="https://github.com/ZilStream">
                <GitHub size={20} />
              </a>
            </div>
            <div className="text-gray-400 dark:text-gray-500 text-sm mt-4">
              <Link href="/membership" className="hover:underline mr-6 mb-4">
                Membership
              </Link>
              <Link href="/disclaimer" className="hover:underline mr-6 mb-4">
                Disclaimer
              </Link>
              <Link href="/terms" className="hover:underline mr-6 mb-4">
                Terms
              </Link>
              <Link href="/api_terms" className="hover:underline mr-6 mb-4">
                API Terms
              </Link>
              <Link href="https://github.com/zilstream/tokens" className="hover:underline mr-6 mb-4">
                Request listing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
