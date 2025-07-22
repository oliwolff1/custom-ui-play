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
        <title>Imperial Login Portal</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style nonce={getKindeNonce()}>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Courier New', monospace;
            background: linear-gradient(135deg, #000000 0%, #1a1a2e 50%, #16213e 100%);
            color: #00ff41;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }
          
          .stars {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
          }
          
          .star {
            position: absolute;
            width: 2px;
            height: 2px;
            background: white;
            border-radius: 50%;
            animation: twinkle 3s infinite;
          }
          
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
          
          .login-container {
            background: rgba(0, 0, 0, 0.8);
            border: 2px solid #00ff41;
            border-radius: 10px;
            padding: 40px;
            text-align: center;
            box-shadow: 0 0 30px rgba(0, 255, 65, 0.3);
            max-width: 500px;
            width: 90%;
            position: relative;
            z-index: 10;
          }
          
          .empire-logo {
            width: 80px;
            height: 80px;
            margin: 0 auto 20px;
            border: 2px solid #00ff41;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            animation: pulse 2s infinite;
          }
          
          @keyframes pulse {
            0%, 100% { box-shadow: 0 0 20px rgba(0, 255, 65, 0.5); }
            50% { box-shadow: 0 0 40px rgba(0, 255, 65, 0.8); }
          }
          
          .title {
            font-size: 28px;
            margin-bottom: 10px;
            text-shadow: 0 0 10px #00ff41;
            letter-spacing: 2px;
          }
          
          .subtitle {
            font-size: 14px;
            margin-bottom: 30px;
            opacity: 0.8;
            letter-spacing: 1px;
          }
          
          .access-button {
            background: linear-gradient(45deg, #00ff41, #00cc33);
            color: #000;
            border: none;
            padding: 15px 30px;
            font-size: 16px;
            font-weight: bold;
            border-radius: 5px;
            cursor: pointer;
            text-transform: uppercase;
            letter-spacing: 1px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 255, 65, 0.3);
          }
          
          .access-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 255, 65, 0.5);
          }
          
          .scanner-line {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, #00ff41, transparent);
            animation: scan 3s linear infinite;
          }
          
          @keyframes scan {
            0% { transform: translateY(0); opacity: 1; }
            100% { transform: translateY(400px); opacity: 0; }
          }
          
          .status-text {
            margin-top: 20px;
            font-size: 12px;
            opacity: 0.6;
            animation: blink 1.5s infinite;
          }
          
          @keyframes blink {
            0%, 50% { opacity: 0.6; }
            51%, 100% { opacity: 0.2; }
          }
          
          .grid-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: 
              linear-gradient(rgba(0, 255, 65, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 65, 0.1) 1px, transparent 1px);
            background-size: 50px 50px;
            pointer-events: none;
            opacity: 0.3;
          }
        `}</style>
      </head>
      <body>
        <div className="grid-overlay"></div>
        <div className="stars">
          {Array.from({ length: 50 }, (_, i) => (
            <div
              key={i}
              className="star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        <div className="login-container">
          <div className="scanner-line"></div>
          <div className="empire-logo">⚡</div>
          <h1 className="title">IMPERIAL ACCESS</h1>
          <p className="subtitle">Secure Authentication Portal</p>

          <form action="/api/auth/login" method="get">
            <button type="submit" className="access-button">
              Request Access Clearance
            </button>
          </form>

          <div className="status-text">› Connecting to Kinde Authentication Network...</div>
        </div>

        <script nonce={getKindeNonce()}>{`
          // Add some interactive elements
          document.addEventListener('DOMContentLoaded', function() {
            const button = document.querySelector('.access-button');
            const statusText = document.querySelector('.status-text');
            
            button.addEventListener('click', function() {
              statusText.textContent = '› Initiating secure connection...';
              setTimeout(() => {
                statusText.textContent = '› Redirecting to authentication...';
              }, 1000);
            });
            
            // Add random star twinkling
            setInterval(() => {
              const stars = document.querySelectorAll('.star');
              const randomStar = stars[Math.floor(Math.random() * stars.length)];
              if (randomStar) {
                randomStar.style.animationDuration = (Math.random() * 2 + 1) + 's';
              }
            }, 2000);
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