"use server";

import React from "react";
import { renderToString } from "react-dom/server.browser";
import {
  getKindeRequiredCSS,
  getKindeRequiredJS,
  getKindeNonce,
  getKindeWidget,
  getKindeCSRF,
} from "@kinde/infrastructure";
import {
  getSVGFaviconUrl,
  setKindeDesignerCustomProperties,
} from "@kinde/infrastructure";
import Component from "./background.tsx";

const Layout = async ({ request, context }) => {
  return (
    <html lang="en">
      <head>
        <title>Login - Secure Authentication</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style nonce={getKindeNonce()}>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }
          
          .container {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 3rem;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            text-align: center;
            max-width: 400px;
            width: 90%;
            position: relative;
            animation: slideUp 0.8s ease-out;
          }
          
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .logo {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #4f46e5, #7c3aed);
            border-radius: 50%;
            margin: 0 auto 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: pulse 2s infinite;
          }
          
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
          }
          
          .logo::before {
            content: '🔐';
            font-size: 2rem;
          }
          
          h1 {
            color: #1e293b;
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            animation: fadeIn 1s ease-out 0.3s both;
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .subtitle {
            color: #64748b;
            font-size: 1rem;
            margin-bottom: 2rem;
            animation: fadeIn 1s ease-out 0.5s both;
          }
          
          .login-btn {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            color: white;
            border: none;
            padding: 1rem 2rem;
            border-radius: 12px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            width: 100%;
            transition: all 0.3s ease;
            animation: fadeIn 1s ease-out 0.7s both;
            position: relative;
            overflow: hidden;
          }
          
          .login-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(59, 130, 246, 0.4);
          }
          
          .login-btn:active {
            transform: translateY(0);
          }
          
          .login-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s;
          }
          
          .login-btn:hover::before {
            left: 100%;
          }
          
          .features {
            margin-top: 2rem;
            display: flex;
            justify-content: space-around;
            animation: fadeIn 1s ease-out 0.9s both;
          }
          
          .feature {
            display: flex;
            flex-direction: column;
            align-items: center;
            color: #64748b;
            font-size: 0.875rem;
          }
          
          .feature-icon {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #e0e7ff, #c7d2fe);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 0.5rem;
            font-size: 1.2rem;
          }
          
          .floating-shapes {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
          }
          
          .shape {
            position: absolute;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            animation: float 6s ease-in-out infinite;
          }
          
          .shape:nth-child(1) {
            width: 80px;
            height: 80px;
            top: 20%;
            left: 10%;
            animation-delay: 0s;
          }
          
          .shape:nth-child(2) {
            width: 120px;
            height: 120px;
            top: 60%;
            right: 10%;
            animation-delay: 2s;
          }
          
          .shape:nth-child(3) {
            width: 60px;
            height: 60px;
            bottom: 20%;
            left: 20%;
            animation-delay: 4s;
          }
          
          @keyframes float {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
            }
            33% {
              transform: translateY(-20px) rotate(120deg);
            }
            66% {
              transform: translateY(10px) rotate(240deg);
            }
          }
          
          @media (max-width: 480px) {
            .container {
              padding: 2rem;
              margin: 1rem;
            }
            
            h1 {
              font-size: 1.5rem;
            }
            
            .features {
              flex-direction: column;
              gap: 1rem;
            }
          }
        `}</style>
      </head>
      <body>
        <div className="floating-shapes">
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
        </div>

        <div className="container">
          <div className="logo"></div>
          <h1>Welcome Back</h1>
          <p className="subtitle">Sign in to access your secure account</p>

          getKindeWidget()

          <div className="features">
            <div className="feature">
              <div className="feature-icon">🔒</div>
              <span>Secure</span>
            </div>
            <div className="feature">
              <div className="feature-icon">⚡</div>
              <span>Fast</span>
            </div>
            <div className="feature">
              <div className="feature-icon">🛡️</div>
              <span>Protected</span>
            </div>
          </div>
        </div>

        <script nonce={getKindeNonce()}>{`
          // Add subtle interactive animations
          document.addEventListener('DOMContentLoaded', function() {
            const container = document.querySelector('.container');
            const shapes = document.querySelectorAll('.shape');
            
            // Add mouse move effect to container
            document.addEventListener('mousemove', function(e) {
              const x = (e.clientX / window.innerWidth) * 100;
              const y = (e.clientY / window.innerHeight) * 100;
              
              container.style.transform = \`translate(\${(x - 50) * 0.02}px, \${(y - 50) * 0.02}px)\`;
              
              shapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.01;
                shape.style.transform = \`translate(\${(x - 50) * speed}px, \${(y - 50) * speed}px)\`;
              });
            });
            
            // Add click ripple effect to button
            const button = document.querySelector('.login-btn');
            button.addEventListener('click', function(e) {
              const ripple = document.createElement('span');
              const rect = button.getBoundingClientRect();
              const size = Math.max(rect.width, rect.height);
              const x = e.clientX - rect.left - size / 2;
              const y = e.clientY - rect.top - size / 2;
              
              ripple.style.cssText = \`
                position: absolute;
                width: \${size}px;
                height: \${size}px;
                left: \${x}px;
                top: \${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
              \`;
              
              button.appendChild(ripple);
              
              setTimeout(() => {
                ripple.remove();
              }, 600);
            });
            
            // Add CSS for ripple animation
            const style = document.createElement('style');
            style.textContent = \`
              @keyframes ripple {
                to {
                  transform: scale(4);
                  opacity: 0;
                }
              }
            \`;
            document.head.appendChild(style);
          });
        `}</script>
      </body>
    </html>
  )
}

export default async function Page(event) {
  const page = await Layout({ ...event });
  return renderToString(page);
}