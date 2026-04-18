/**
 * Landing — Glassmorphism v3
 * Particle network hero · Typewriter headline · AOS reveals · Framer motion
 */
import { useState, useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { TypeAnimation } from 'react-type-animation';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Shield, CheckCircle, ArrowRight, Star, Zap, Lock,
  Eye, Activity, Globe, ChevronRight, AlertTriangle,
  Award, Clock, Sun, Moon, LogIn, History, LogOut, UserCheck,
  User, AlertOctagon, LayoutDashboard, Mail, Server,
  Code, Package, Key, Scan,
} from 'lucide-react';
import JacobAvatar, { SpeechBubble } from '../components/JacobAvatar';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

/* ─── Data ──────────────────────────────────────────────────── */
const LANDING_USE_CASES = [
  { icon: '🔭', color: '#0EA5E9', label: 'Reconnaissance & Attack Surface',   desc: 'Subdomains, OSINT, live host probing' },
  { icon: '📧', color: '#EC4899', label: 'DNS & Email Security',              desc: 'SPF, DMARC, DKIM, MX spoofability'    },
  { icon: '🌐', color: '#F59E0B', label: 'Internet Exposure & Open Services', desc: 'Open ports, WAF, Shodan/Censys scan'   },
  { icon: '🔐', color: '#06B6D4', label: 'Cryptographic & TLS Security',      desc: 'Cipher audit, cert chain, POODLE'      },
  { icon: '⚙️', color: '#8B5CF6', label: 'Security Misconfiguration',         desc: 'CSP, HSTS, CORS, cookie flags'         },
  { icon: '🚪', color: '#1B4FBF', label: 'Access Control & File Exposure',    desc: '9k+ path enum, .env/.git disclosure'   },
  { icon: '🧩', color: '#F97316', label: 'Vulnerable & Outdated Components',  desc: 'Stack fingerprint, NVD CVE cross-ref'  },
  { icon: '🕷️', color: '#EF4444', label: 'Web Application DAST',              desc: 'ZAP spider + active injection probes'  },
  { icon: '🔑', color: '#10B981', label: 'Authentication & Session Security', desc: 'CSRF, MFA detection, rate limiting'    },
  { icon: '💉', color: '#B91C1C', label: 'Injection Attack Surface',          desc: 'SQLi, XSS, path traversal, RCE'        },
  { icon: '🔓', color: '#6366F1', label: 'Sensitive Data Exposure',           desc: 'Hardcoded secrets, JS tokens, SRI'     },
  { icon: '🌍', color: '#FB923C', label: 'SSRF & Server-Side Attacks',        desc: 'Open redirect, host header injection'  },
  { icon: '🔌', color: '#3B82F6', label: 'API Security & Endpoint Discovery', desc: 'Swagger exposure, unauth API access'   },
  { icon: '⚖️', color: '#F59E0B', label: 'Business Logic & Privilege Abuse',  desc: 'Privilege escalation, HTTP methods'    },
  { icon: '☁️', color: '#10B981', label: 'Internet Asset Exposure',           desc: 'Cloud assets, co-hosted domain risk'   },
  { icon: '📦', color: '#F97316', label: 'Third-Party Component Risk',        desc: 'CDN scripts, supply chain CVEs, SRI'   },
  { icon: '📋', color: '#22C55E', label: 'Compliance & Regulatory Posture',   desc: 'NDPA 2023, CBN RBCF, PCI DSS 4.0'     },
  { icon: '🚨', color: '#F43F5E', label: 'Data Leakage & Exfil Paths',        desc: 'Backup files, debug pages, error info' },
];

const STATS = [
  { value: '18',   numericEnd: 18,  label: 'Security use cases',     sublabel: 'core + DAST attack surface', icon: Activity, color: '#1B4FBF' },
  { value: '500+', numericEnd: 500, label: 'Businesses protected',   sublabel: 'Nigerian SMEs & enterprises', icon: Shield,   color: '#6366F1' },
  { value: '<10 min', numericEnd: null, label: 'Scan to report',        sublabel: 'URL to expert-reviewed PDF',  icon: Clock,    color: '#0EA5E9' },
  { value: 'NDPA', numericEnd: null, label: '2023 Compliance Mapped',sublabel: 'SEC · CBN · OWASP',           icon: Award,    color: '#10B981' },
];

const REVIEW_CAPS = [
  { icon: AlertTriangle, color: '#EF4444', label: 'Web Vulnerabilities',     desc: 'XSS, SQLi, SSRF, RCE & more'  },
  { icon: Code,          color: '#0EA5E9', label: 'API Vulnerabilities',      desc: 'OWASP API Top 10 mapped'       },
  { icon: Key,           color: '#8B5CF6', label: 'Secrets & Cloud Exposure', desc: 'Keys, tokens, credentials'     },
  { icon: Award,         color: '#10B981', label: 'Compliance Results',       desc: 'NDPA · OWASP · CBN · SEC'      },
  { icon: Server,        color: '#F59E0B', label: 'Server Open Ports',        desc: 'Dark Web + Nmap intelligence'    },
  { icon: Mail,          color: '#EC4899', label: 'Mail Configuration',       desc: 'SPF, DMARC, DKIM health'       },
  { icon: Lock,          color: '#06B6D4', label: 'Detailed SSL Report',      desc: 'Certs, ciphers & protocols'    },
  { icon: Package,       color: '#F97316', label: 'JavaScript Packages',      desc: 'CVEs in your exact versions'   },
];

const TESTIMONIALS = [
  { text: 'Found a critical vulnerability on our customer portal we had no idea existed. The report told us exactly what to fix. We had it resolved the same day.', name: 'Amaka T.', role: 'Founder', company: 'E-commerce Business', color: '#1B4FBF', initials: 'AT' },
  { text: "Our IT team is small and a full audit was out of budget. ScanOne gave us a professional security report in 10 minutes that we shared with our board.", name: 'Chukwudi M.', role: 'CEO', company: 'Healthtech Startup', color: '#6366F1', initials: 'CM' },
  { text: 'The email security check found our DMARC was completely open. Attackers could have sent fake emails from our domain to every one of our clients.', name: 'Bola A.', role: 'Head of Technology', company: 'Logistics Company', color: '#10B981', initials: 'BA' },
  { text: "Simple, fast, and the report was actually readable. I'm not a security person but I understood every finding and knew exactly what to do first.", name: 'Ngozi F.', role: 'Operations Manager', company: 'Professional Services Firm', color: '#F59E0B', initials: 'NF' },
  { text: 'We ran it before launch and found 3 high-severity issues. Fixed them before a single customer visited the site. That peace of mind was worth everything.', name: 'Emeka O.', role: 'CTO', company: 'SaaS Company', color: '#EC4899', initials: 'EO' },
  { text: 'The PDF report mapped every finding to NDPA 2023. Our legal team could finally read a security report and understand what it meant for our compliance obligations.', name: 'Yetunde L.', role: 'Head of Compliance', company: 'Financial Services Firm', color: '#0EA5E9', initials: 'YL' },
];

const LIVE_FEED = [
  { domain: 'shop.mybrand.ng',           sev: 'CRITICAL', color: '#EF4444', id: 'f1' },
  { domain: 'api.techstartup.com',       sev: 'HIGH',     color: '#F97316', id: 'f2' },
  { domain: 'portal.company.ng',         sev: 'CRITICAL', color: '#EF4444', id: 'f3' },
  { domain: 'app.business.ng',           sev: 'HIGH',     color: '#F97316', id: 'f4' },
  { domain: 'admin.mysite.ng',           sev: 'MEDIUM',   color: '#F59E0B', id: 'f5' },
  { domain: 'pay.serviceprovider.ng',    sev: 'HIGH',     color: '#F97316', id: 'f6' },
  { domain: 'www.ecommerce.ng',          sev: 'MEDIUM',   color: '#F59E0B', id: 'f7' },
  { domain: 'health.clinic.ng',          sev: 'LOW',      color: '#10B981', id: 'f8' },
  { domain: '41.58.32.17',              sev: 'CRITICAL', color: '#EF4444', id: 'f9' },
  { domain: 'store.afribiz.ng',          sev: 'HIGH',     color: '#F97316', id: 'f10' },
  { domain: '197.210.54.89',            sev: 'MEDIUM',   color: '#F59E0B', id: 'f11' },
  { domain: 'checkout.lagosshop.com',    sev: 'CRITICAL', color: '#EF4444', id: 'f12' },
  { domain: '102.89.23.45',             sev: 'HIGH',     color: '#F97316', id: 'f13' },
  { domain: 'crm.fintechng.com',         sev: 'MEDIUM',   color: '#F59E0B', id: 'f14' },
  { domain: '41.203.64.101',            sev: 'LOW',      color: '#10B981', id: 'f15' },
  { domain: 'login.edupay.ng',           sev: 'HIGH',     color: '#F97316', id: 'f16' },
  { domain: '105.112.18.200',           sev: 'CRITICAL', color: '#EF4444', id: 'f17' },
  { domain: 'api.paystack-clone.ng',     sev: 'HIGH',     color: '#F97316', id: 'f18' },
  { domain: '196.216.7.33',             sev: 'MEDIUM',   color: '#F59E0B', id: 'f19' },
  { domain: 'erp.constructionco.ng',     sev: 'LOW',      color: '#10B981', id: 'f20' },
  { domain: '41.76.108.222',            sev: 'HIGH',     color: '#F97316', id: 'f21' },
  { domain: 'hr.staffsync.ng',           sev: 'MEDIUM',   color: '#F59E0B', id: 'f22' },
  { domain: '154.118.24.6',             sev: 'CRITICAL', color: '#EF4444', id: 'f23' },
  { domain: 'booking.hotelabuja.ng',     sev: 'HIGH',     color: '#F97316', id: 'f24' },
  { domain: '197.255.200.11',           sev: 'MEDIUM',   color: '#F59E0B', id: 'f25' },
  { domain: 'dash.insurtech.ng',         sev: 'LOW',      color: '#10B981', id: 'f26' },
  { domain: '41.184.93.70',             sev: 'CRITICAL', color: '#EF4444', id: 'f27' },
  { domain: 'sso.govportal.ng',          sev: 'CRITICAL', color: '#EF4444', id: 'f28' },
  { domain: '196.49.1.120',             sev: 'HIGH',     color: '#F97316', id: 'f29' },
  { domain: 'api.lendingapp.ng',         sev: 'HIGH',     color: '#F97316', id: 'f30' },
  { domain: '105.113.7.88',             sev: 'MEDIUM',   color: '#F59E0B', id: 'f31' },
  { domain: 'mail.logistics247.ng',      sev: 'LOW',      color: '#10B981', id: 'f32' },
  { domain: '41.58.110.44',             sev: 'CRITICAL', color: '#EF4444', id: 'f33' },
  { domain: 'admin.abujamall.ng',        sev: 'HIGH',     color: '#F97316', id: 'f34' },
  { domain: '102.130.10.5',             sev: 'MEDIUM',   color: '#F59E0B', id: 'f35' },
  { domain: 'vpn.oilfieldtech.ng',       sev: 'LOW',      color: '#10B981', id: 'f36' },
  { domain: '197.149.93.40',            sev: 'HIGH',     color: '#F97316', id: 'f37' },
  { domain: 'portal.healthinsure.ng',    sev: 'CRITICAL', color: '#EF4444', id: 'f38' },
  { domain: '41.79.204.15',             sev: 'MEDIUM',   color: '#F59E0B', id: 'f39' },
  { domain: 'invoice.accountingpro.ng',  sev: 'HIGH',     color: '#F97316', id: 'f40' },
  { domain: '196.200.3.77',             sev: 'LOW',      color: '#10B981', id: 'f41' },
  { domain: 'auth.quickteller.ng',       sev: 'CRITICAL', color: '#EF4444', id: 'f42' },
  { domain: '154.72.166.51',            sev: 'HIGH',     color: '#F97316', id: 'f43' },
  { domain: 'www.pharmacy-online.ng',    sev: 'MEDIUM',   color: '#F59E0B', id: 'f44' },
  { domain: '41.203.80.190',            sev: 'LOW',      color: '#10B981', id: 'f45' },
  { domain: 'cdn.mediastream.ng',        sev: 'MEDIUM',   color: '#F59E0B', id: 'f46' },
  { domain: '196.6.207.83',             sev: 'CRITICAL', color: '#EF4444', id: 'f47' },
  { domain: 'dashboard.agritech.ng',     sev: 'HIGH',     color: '#F97316', id: 'f48' },
  { domain: '105.235.128.9',            sev: 'MEDIUM',   color: '#F59E0B', id: 'f49' },
  { domain: 'reports.taxportal.ng',      sev: 'LOW',      color: '#10B981', id: 'f50' },
  { domain: '41.138.160.25',            sev: 'CRITICAL', color: '#EF4444', id: 'f51' },
  { domain: 'staging.saas-africa.com',   sev: 'HIGH',     color: '#F97316', id: 'f52' },
  { domain: '197.210.100.62',           sev: 'MEDIUM',   color: '#F59E0B', id: 'f53' },
  { domain: 'pos.retailchain.ng',        sev: 'LOW',      color: '#10B981', id: 'f54' },
  { domain: '196.52.43.111',            sev: 'HIGH',     color: '#F97316', id: 'f55' },
  { domain: 'api.transportng.com',       sev: 'CRITICAL', color: '#EF4444', id: 'f56' },
  { domain: '41.58.201.3',              sev: 'MEDIUM',   color: '#F59E0B', id: 'f57' },
  { domain: 'account.mfbportal.ng',      sev: 'HIGH',     color: '#F97316', id: 'f58' },
  { domain: '102.89.71.200',            sev: 'LOW',      color: '#10B981', id: 'f59' },
  { domain: 'iot.smartfarm.ng',          sev: 'MEDIUM',   color: '#F59E0B', id: 'f60' },
  { domain: '41.206.20.8',              sev: 'CRITICAL', color: '#EF4444', id: 'f61' },
  { domain: 'chat.customersupport.ng',   sev: 'HIGH',     color: '#F97316', id: 'f62' },
  { domain: '196.223.5.19',             sev: 'LOW',      color: '#10B981', id: 'f63' },
  { domain: 'admin.realestate-ng.com',   sev: 'HIGH',     color: '#F97316', id: 'f64' },
  { domain: '154.120.40.7',             sev: 'MEDIUM',   color: '#F59E0B', id: 'f65' },
  { domain: 'upload.cloudstore.ng',      sev: 'LOW',      color: '#10B981', id: 'f66' },
  { domain: '41.58.44.130',             sev: 'CRITICAL', color: '#EF4444', id: 'f67' },
  { domain: 'api.walletpay.ng',          sev: 'HIGH',     color: '#F97316', id: 'f68' },
  { domain: '197.248.16.35',            sev: 'MEDIUM',   color: '#F59E0B', id: 'f69' },
  { domain: 'metrics.datafirm.ng',       sev: 'LOW',      color: '#10B981', id: 'f70' },
  { domain: '41.217.204.51',            sev: 'CRITICAL', color: '#EF4444', id: 'f71' },
  { domain: 'erp.manufactureng.com',     sev: 'HIGH',     color: '#F97316', id: 'f72' },
  { domain: '196.12.59.88',             sev: 'MEDIUM',   color: '#F59E0B', id: 'f73' },
  { domain: 'dev.blockchainng.io',       sev: 'LOW',      color: '#10B981', id: 'f74' },
  { domain: '105.113.200.6',            sev: 'HIGH',     color: '#F97316', id: 'f75' },
  { domain: 'panel.cloudhostng.com',     sev: 'CRITICAL', color: '#EF4444', id: 'f76' },
  { domain: '41.184.241.100',           sev: 'MEDIUM',   color: '#F59E0B', id: 'f77' },
  { domain: 'market.naijavendor.ng',     sev: 'HIGH',     color: '#F97316', id: 'f78' },
  { domain: '197.210.224.14',           sev: 'LOW',      color: '#10B981', id: 'f79' },
  { domain: 'auth.edulearn.ng',          sev: 'HIGH',     color: '#F97316', id: 'f80' },
  { domain: '41.79.12.67',              sev: 'CRITICAL', color: '#EF4444', id: 'f81' },
  { domain: 'orders.groceryfast.ng',     sev: 'MEDIUM',   color: '#F59E0B', id: 'f82' },
  { domain: '196.43.172.33',            sev: 'LOW',      color: '#10B981', id: 'f83' },
  { domain: 'webhook.paymentgw.ng',      sev: 'HIGH',     color: '#F97316', id: 'f84' },
  { domain: '154.72.80.200',            sev: 'CRITICAL', color: '#EF4444', id: 'f85' },
  { domain: 'kyc.microfinance.ng',       sev: 'HIGH',     color: '#F97316', id: 'f86' },
  { domain: '41.203.166.55',            sev: 'MEDIUM',   color: '#F59E0B', id: 'f87' },
  { domain: 'scan.cyberclinic.ng',       sev: 'LOW',      color: '#10B981', id: 'f88' },
  { domain: '196.168.5.44',             sev: 'CRITICAL', color: '#EF4444', id: 'f89' },
  { domain: 'vpn.telcong.com',           sev: 'HIGH',     color: '#F97316', id: 'f90' },
  { domain: '41.58.77.19',              sev: 'MEDIUM',   color: '#F59E0B', id: 'f91' },
  { domain: 'app.loanapp.ng',            sev: 'HIGH',     color: '#F97316', id: 'f92' },
  { domain: '102.89.130.10',            sev: 'LOW',      color: '#10B981', id: 'f93' },
  { domain: 'ssh.vps-africa.ng',         sev: 'CRITICAL', color: '#EF4444', id: 'f94' },
  { domain: '41.206.88.3',              sev: 'HIGH',     color: '#F97316', id: 'f95' },
  { domain: 'tracking.courierng.com',    sev: 'MEDIUM',   color: '#F59E0B', id: 'f96' },
  { domain: '197.149.10.77',            sev: 'LOW',      color: '#10B981', id: 'f97' },
  { domain: 'admin.hospitalms.ng',       sev: 'CRITICAL', color: '#EF4444', id: 'f98' },
  { domain: '196.216.55.9',             sev: 'HIGH',     color: '#F97316', id: 'f99' },
  { domain: 'files.storageng.io',        sev: 'MEDIUM',   color: '#F59E0B', id: 'f100' },
  { domain: '41.79.90.11',              sev: 'LOW',      color: '#10B981', id: 'f101' },
  { domain: 'api.mobilebank.ng',         sev: 'CRITICAL', color: '#EF4444', id: 'f102' },
  { domain: '154.118.101.200',          sev: 'HIGH',     color: '#F97316', id: 'f103' },
  { domain: 'crm.insuranceco.ng',        sev: 'MEDIUM',   color: '#F59E0B', id: 'f104' },
  { domain: '41.184.7.60',              sev: 'LOW',      color: '#10B981', id: 'f105' },
  { domain: 'data.analyticsfirm.ng',     sev: 'HIGH',     color: '#F97316', id: 'f106' },
  { domain: '196.49.200.88',            sev: 'CRITICAL', color: '#EF4444', id: 'f107' },
  { domain: 'api.rideshare.ng',          sev: 'HIGH',     color: '#F97316', id: 'f108' },
  { domain: '105.112.200.45',           sev: 'MEDIUM',   color: '#F59E0B', id: 'f109' },
  { domain: 'console.safecloud.ng',      sev: 'LOW',      color: '#10B981', id: 'f110' },
  { domain: '41.203.44.7',              sev: 'CRITICAL', color: '#EF4444', id: 'f111' },
  { domain: 'billing.isprovider.ng',     sev: 'HIGH',     color: '#F97316', id: 'f112' },
  { domain: '197.210.6.33',             sev: 'MEDIUM',   color: '#F59E0B', id: 'f113' },
  { domain: 'jobs.hrplatform.ng',        sev: 'LOW',      color: '#10B981', id: 'f114' },
  { domain: '41.58.155.201',            sev: 'CRITICAL', color: '#EF4444', id: 'f115' },
  { domain: 'backend.legaltech.ng',      sev: 'HIGH',     color: '#F97316', id: 'f116' },
  { domain: '196.6.100.44',             sev: 'MEDIUM',   color: '#F59E0B', id: 'f117' },
  { domain: 'dashboard.supplychain.ng',  sev: 'HIGH',     color: '#F97316', id: 'f118' },
  { domain: '41.206.160.55',            sev: 'LOW',      color: '#10B981', id: 'f119' },
  { domain: 'api.crowdfund.ng',          sev: 'CRITICAL', color: '#EF4444', id: 'f120' },
  { domain: '154.72.44.19',             sev: 'HIGH',     color: '#F97316', id: 'f121' },
  { domain: 'portal.pensionng.com',      sev: 'MEDIUM',   color: '#F59E0B', id: 'f122' },
  { domain: '41.138.200.90',            sev: 'LOW',      color: '#10B981', id: 'f123' },
  { domain: 'ftp.mediabrand.ng',         sev: 'HIGH',     color: '#F97316', id: 'f124' },
  { domain: '196.52.180.3',             sev: 'CRITICAL', color: '#EF4444', id: 'f125' },
  { domain: 'payroll.hrsoftware.ng',     sev: 'HIGH',     color: '#F97316', id: 'f126' },
  { domain: '41.79.55.120',             sev: 'MEDIUM',   color: '#F59E0B', id: 'f127' },
  { domain: 'stream.videoapp.ng',        sev: 'LOW',      color: '#10B981', id: 'f128' },
  { domain: '197.149.55.8',             sev: 'CRITICAL', color: '#EF4444', id: 'f129' },
  { domain: 'ticket.eventsng.com',       sev: 'HIGH',     color: '#F97316', id: 'f130' },
  { domain: '41.203.22.177',            sev: 'MEDIUM',   color: '#F59E0B', id: 'f131' },
  { domain: 'admin.proptech.ng',         sev: 'LOW',      color: '#10B981', id: 'f132' },
  { domain: '196.12.11.200',            sev: 'HIGH',     color: '#F97316', id: 'f133' },
  { domain: 'oauth.ssoplatform.ng',      sev: 'CRITICAL', color: '#EF4444', id: 'f134' },
  { domain: '41.58.88.4',               sev: 'HIGH',     color: '#F97316', id: 'f135' },
  { domain: 'logs.monitorng.io',         sev: 'MEDIUM',   color: '#F59E0B', id: 'f136' },
  { domain: '105.235.200.17',           sev: 'LOW',      color: '#10B981', id: 'f137' },
  { domain: 'payment.schoolfees.ng',     sev: 'HIGH',     color: '#F97316', id: 'f138' },
  { domain: '41.217.128.60',            sev: 'CRITICAL', color: '#EF4444', id: 'f139' },
  { domain: 'api.energytech.ng',         sev: 'HIGH',     color: '#F97316', id: 'f140' },
  { domain: '196.216.200.5',            sev: 'MEDIUM',   color: '#F59E0B', id: 'f141' },
  { domain: 'cms.publisherng.com',       sev: 'LOW',      color: '#10B981', id: 'f142' },
  { domain: '41.76.55.33',              sev: 'CRITICAL', color: '#EF4444', id: 'f143' },
  { domain: 'beta.cryptoexchange.ng',    sev: 'HIGH',     color: '#F97316', id: 'f144' },
  { domain: '154.120.88.11',            sev: 'MEDIUM',   color: '#F59E0B', id: 'f145' },
  { domain: 'ws.realtimeapp.ng',         sev: 'LOW',      color: '#10B981', id: 'f146' },
  { domain: '41.184.100.200',           sev: 'CRITICAL', color: '#EF4444', id: 'f147' },
  { domain: 'admin.travelng.com',        sev: 'HIGH',     color: '#F97316', id: 'f148' },
  { domain: '196.200.180.7',            sev: 'MEDIUM',   color: '#F59E0B', id: 'f149' },
  { domain: 'api.savingsapp.ng',         sev: 'LOW',      color: '#10B981', id: 'f150' },
  { domain: '41.58.230.88',             sev: 'CRITICAL', color: '#EF4444', id: 'f151' },
  { domain: 'portal.universityng.edu',   sev: 'HIGH',     color: '#F97316', id: 'f152' },
  { domain: '102.130.88.200',           sev: 'MEDIUM',   color: '#F59E0B', id: 'f153' },
  { domain: 'gateway.apimgmt.ng',        sev: 'HIGH',     color: '#F97316', id: 'f154' },
  { domain: '41.206.44.11',             sev: 'LOW',      color: '#10B981', id: 'f155' },
  { domain: 'cdn.contentng.io',          sev: 'CRITICAL', color: '#EF4444', id: 'f156' },
  { domain: '196.49.77.100',            sev: 'HIGH',     color: '#F97316', id: 'f157' },
  { domain: 'scheduler.taskbot.ng',      sev: 'MEDIUM',   color: '#F59E0B', id: 'f158' },
  { domain: '41.79.200.3',              sev: 'LOW',      color: '#10B981', id: 'f159' },
  { domain: 'dash.fleetmgmt.ng',         sev: 'HIGH',     color: '#F97316', id: 'f160' },
  { domain: '197.210.44.55',            sev: 'CRITICAL', color: '#EF4444', id: 'f161' },
  { domain: 'connect.partnerportal.ng',  sev: 'HIGH',     color: '#F97316', id: 'f162' },
  { domain: '41.203.200.88',            sev: 'MEDIUM',   color: '#F59E0B', id: 'f163' },
  { domain: 'api.wealthmgmt.ng',         sev: 'LOW',      color: '#10B981', id: 'f164' },
  { domain: '154.118.60.14',            sev: 'CRITICAL', color: '#EF4444', id: 'f165' },
  { domain: 'intranet.corpng.com',       sev: 'HIGH',     color: '#F97316', id: 'f166' },
  { domain: '41.138.44.7',              sev: 'MEDIUM',   color: '#F59E0B', id: 'f167' },
  { domain: 'db.analyticsapi.ng',        sev: 'LOW',      color: '#10B981', id: 'f168' },
  { domain: '196.6.55.200',             sev: 'CRITICAL', color: '#EF4444', id: 'f169' },
  { domain: 'app.remittance.ng',         sev: 'HIGH',     color: '#F97316', id: 'f170' },
  { domain: '41.58.180.121',            sev: 'MEDIUM',   color: '#F59E0B', id: 'f171' },
  { domain: 'secure.insurebetter.ng',    sev: 'LOW',      color: '#10B981', id: 'f172' },
  { domain: '105.112.44.33',            sev: 'CRITICAL', color: '#EF4444', id: 'f173' },
  { domain: 'hub.startupaccel.ng',       sev: 'HIGH',     color: '#F97316', id: 'f174' },
  { domain: '196.52.10.19',             sev: 'MEDIUM',   color: '#F59E0B', id: 'f175' },
  { domain: 'transfer.exchangeapp.ng',   sev: 'HIGH',     color: '#F97316', id: 'f176' },
  { domain: '41.203.88.4',              sev: 'LOW',      color: '#10B981', id: 'f177' },
  { domain: 'report.complianceng.com',   sev: 'CRITICAL', color: '#EF4444', id: 'f178' },
  { domain: '197.149.200.77',           sev: 'HIGH',     color: '#F97316', id: 'f179' },
  { domain: 'audit.bankingsys.ng',       sev: 'MEDIUM',   color: '#F59E0B', id: 'f180' },
  { domain: '41.79.140.200',            sev: 'LOW',      color: '#10B981', id: 'f181' },
  { domain: 'node01.miningpool.ng',      sev: 'HIGH',     color: '#F97316', id: 'f182' },
  { domain: '196.223.100.5',            sev: 'CRITICAL', color: '#EF4444', id: 'f183' },
  { domain: 'api.socialcommerce.ng',     sev: 'HIGH',     color: '#F97316', id: 'f184' },
  { domain: '41.58.22.60',              sev: 'MEDIUM',   color: '#F59E0B', id: 'f185' },
  { domain: 'live.broadcastng.tv',       sev: 'LOW',      color: '#10B981', id: 'f186' },
  { domain: '154.72.200.33',            sev: 'CRITICAL', color: '#EF4444', id: 'f187' },
  { domain: 'pos.quickservice.ng',       sev: 'HIGH',     color: '#F97316', id: 'f188' },
  { domain: '41.206.200.14',            sev: 'MEDIUM',   color: '#F59E0B', id: 'f189' },
  { domain: 'admin.ngoplatform.ng',      sev: 'LOW',      color: '#10B981', id: 'f190' },
  { domain: '196.12.180.88',            sev: 'HIGH',     color: '#F97316', id: 'f191' },
  { domain: 'auth.identityng.com',       sev: 'CRITICAL', color: '#EF4444', id: 'f192' },
  { domain: '41.138.120.4',             sev: 'HIGH',     color: '#F97316', id: 'f193' },
  { domain: 'backend.propmarket.ng',     sev: 'MEDIUM',   color: '#F59E0B', id: 'f194' },
  { domain: '197.210.180.200',          sev: 'LOW',      color: '#10B981', id: 'f195' },
  { domain: 'sms.notifyapi.ng',          sev: 'HIGH',     color: '#F97316', id: 'f196' },
  { domain: '41.58.100.9',              sev: 'CRITICAL', color: '#EF4444', id: 'f197' },
  { domain: 'gateway.meshpay.ng',        sev: 'HIGH',     color: '#F97316', id: 'f198' },
  { domain: '196.168.80.33',            sev: 'MEDIUM',   color: '#F59E0B', id: 'f199' },
  { domain: 'portal.customs.gov.ng',     sev: 'CRITICAL', color: '#EF4444', id: 'f200' },
  { domain: '41.203.150.7',             sev: 'HIGH',     color: '#F97316', id: 'f201' },
  { domain: 'api.rentpay.ng',            sev: 'MEDIUM',   color: '#F59E0B', id: 'f202' },
  { domain: '154.120.10.55',            sev: 'LOW',      color: '#10B981', id: 'f203' },
  { domain: 'admin.telemedicine.ng',     sev: 'HIGH',     color: '#F97316', id: 'f204' },
  { domain: '41.76.200.18',             sev: 'CRITICAL', color: '#EF4444', id: 'f205' },
  { domain: 'secure.vatportal.ng',       sev: 'HIGH',     color: '#F97316', id: 'f206' },
  { domain: '196.216.44.77',            sev: 'MEDIUM',   color: '#F59E0B', id: 'f207' },
  { domain: 'app.careergrowth.ng',       sev: 'LOW',      color: '#10B981', id: 'f208' },
  { domain: '105.113.100.200',          sev: 'CRITICAL', color: '#EF4444', id: 'f209' },
  { domain: 'dash.investng.com',         sev: 'HIGH',     color: '#F97316', id: 'f210' },
];

const JACOB_WELCOMES = [
  "I'm Jacob — your virtual security expert. Let me check if your business website has any vulnerabilities right now.",
  "Every website has weaknesses. The question is: do you know yours before attackers do?",
  "A scan takes less than 10 minutes. A breach can take months to recover from. Enter your domain.",
  "I've analysed thousands of Nigerian business websites. Most have at least one critical issue they didn't know about.",
  "Email spoofing, exposed databases, weak SSL — I'll check for all of it. Just give me a domain.",
  "Your website is your business front door. Let me check if it's locked.",
];

/* ─── Compliance demo data ────────────────────────────────────── */
const COMPLIANCE_FINDINGS = [
  {
    sev: 'CRITICAL', sevColor: '#EF4444', cvss: '9.1', cwe: 'CWE-311', phase: 'Phase 8 · TLS',
    title: 'Missing HTTPS Encryption',
    desc: 'Data transmitted over HTTP without TLS allows any attacker on the network to intercept sensitive information in plaintext — including user credentials, session tokens, and personal data.',
    evidence: 'GET /api/user/profile HTTP/1.1\nHost: shop.mybrand.ng\n← 200 OK  (connection: unencrypted)',
    fix: 'Redirect all HTTP → HTTPS. Enable HSTS with min-age 31536000.',
    mappings: [
      { fw: 'NDPA 2023', color: '#1B4FBF', section: 'Section 24(1)(c)', rule: 'Security Safeguard Obligation' },
      { fw: 'OWASP',     color: '#6366F1', section: 'A02:2021',         rule: 'Cryptographic Failures'       },
      { fw: 'CBN RBCF',  color: '#0EA5E9', section: 'Chapter 5.2',      rule: 'Encryption in Transit'        },
      { fw: 'PCI DSS',   color: '#10B981', section: 'Req. 4.2.1',       rule: 'No cleartext account data'    },
    ],
    penalty: '₦10M or 2% of annual turnover (NDPA §48)',
  },
  {
    sev: 'HIGH', sevColor: '#F97316', cvss: '7.5', cwe: 'CWE-346', phase: 'Phase 3 · Recon',
    title: 'Email Spoofing Risk (No SPF)',
    desc: 'No SPF record found for this domain. Attackers can send emails appearing to originate from your domain — a primary vector for phishing attacks targeting your customers.',
    evidence: 'DNS TXT → mybrand.ng\n← No v=spf1 record found\n← DMARC policy: none (unprotected)',
    fix: 'Add SPF record (v=spf1), DKIM signature, and DMARC policy=quarantine.',
    mappings: [
      { fw: 'NDPA 2023', color: '#1B4FBF', section: 'Section 25',   rule: 'Data Controller Obligations'  },
      { fw: 'OWASP',     color: '#6366F1', section: 'A05:2021',     rule: 'Security Misconfiguration'    },
      { fw: 'CBN RBCF',  color: '#0EA5E9', section: 'Section 3.4',  rule: 'Email Security Controls'      },
      { fw: 'PCI DSS',   color: '#10B981', section: 'Req. 12.3',    rule: 'Third-party risk management'  },
    ],
    penalty: 'Phishing liability under Cybercrimes Act 2015',
  },
  {
    sev: 'MEDIUM', sevColor: '#F59E0B', cvss: '5.3', cwe: 'CWE-693', phase: 'Phase 7 · Headers',
    title: 'Missing Content Security Policy',
    desc: 'No CSP header found. Cross-site scripting attacks can execute arbitrary JavaScript in your users\' browsers — exfiltrating sessions, credentials, or injecting phishing overlays.',
    evidence: 'HTTP/1.1 200 OK\nX-Frame-Options: (missing)\nContent-Security-Policy: (missing)',
    fix: 'Add Content-Security-Policy and X-Frame-Options: DENY headers.',
    mappings: [
      { fw: 'NDPA 2023', color: '#1B4FBF', section: 'Section 24',   rule: 'Data Security Measures'      },
      { fw: 'OWASP',     color: '#6366F1', section: 'A05:2021',     rule: 'Security Misconfiguration'   },
      { fw: 'CBN RBCF',  color: '#0EA5E9', section: 'Chapter 4.1',  rule: 'Application Security'        },
      { fw: 'PCI DSS',   color: '#10B981', section: 'Req. 6.4',     rule: 'Web application protection'  },
    ],
    penalty: 'Data breach liability if XSS exploited',
  },
];

/* ─── StatCard ───────────────────────────────────────────────── */
function StatCard({ stat, index, glass, T }) {
  const [counted, setCounted] = useState(0);
  const [triggered, setTriggered] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTriggered(true); obs.disconnect(); }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!triggered || stat.numericEnd === null) return;
    const end = stat.numericEnd;
    const duration = end > 100 ? 1400 : 700;
    const t0 = performance.now();
    const tick = now => {
      const p = Math.min((now - t0) / duration, 1);
      setCounted(Math.floor((1 - Math.pow(1 - p, 3)) * end));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [triggered, stat.numericEnd]);

  const display = stat.numericEnd === null ? stat.value : String(counted);

  return (
    <motion.div
      ref={ref}
      data-aos="fade-up"
      data-aos-delay={index * 80}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      style={{
        ...glass,
        borderRadius: 20, padding: '28px 24px 24px',
        position: 'relative', overflow: 'hidden', cursor: 'default',
      }}
    >
      {/* Top accent bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${stat.color}, transparent)` }} />
      {/* Faint icon watermark */}
      <div style={{ position: 'absolute', bottom: -8, right: -8, opacity: 0.04 }}>
        <stat.icon style={{ width: 80, height: 80, color: stat.color }} />
      </div>
      <div style={{ width: 40, height: 40, borderRadius: 12, marginBottom: 18, background: `${stat.color}18`, border: `1px solid ${stat.color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <stat.icon style={{ width: 18, height: 18, color: stat.color }} />
      </div>
      <div style={{ fontSize: 44, fontWeight: 900, letterSpacing: '-2px', lineHeight: 1, color: stat.color, marginBottom: 8, fontVariantNumeric: 'tabular-nums' }}>{display}</div>
      <div style={{ fontSize: 13, fontWeight: 700, color: T.text, marginBottom: 4 }}>{stat.label}</div>
      <div style={{ fontSize: 11, color: T.textMuted, lineHeight: 1.4 }}>{stat.sublabel}</div>
    </motion.div>
  );
}

/* ─── Glowing glass card wrapper ────────────────────────────── */
function GlowCard({ children, style, glowColor = '#1B4FBF', ...rest }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...style,
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered
          ? `${style?.boxShadow || ''}, 0 0 0 1px ${glowColor}30, 0 8px 40px ${glowColor}20`
          : style?.boxShadow,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
export default function Landing() {
  const { T, theme, toggleTheme } = useTheme();
  const { isLoggedIn, user, isSuper, logout } = useAuth();
  const navigate = useNavigate();
  const startScan = () => navigate(isLoggedIn ? '/scan-setup' : '/signup');

  const [jacobWelcome, setJacobWelcome] = useState(0);
  const [jacobMood, setJacobMood] = useState('happy');
  const jacobRef = useRef(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [feedOffset, setFeedOffset] = useState(0);
  const [particlesInit, setParticlesInit] = useState(false);
  const [activeFinding, setActiveFinding] = useState(0);
  const [pricingTier, setPricingTier] = useState(0);

  useEffect(() => {
    initParticlesEngine(async engine => {
      await loadSlim(engine);
    }).then(() => setParticlesInit(true));
  }, []);

  useEffect(() => {
    AOS.init({ duration: 700, easing: 'ease-out-quart', once: false, mirror: true, offset: 80 });
  }, []);

  useEffect(() => {
    if (isLoggedIn) navigate('/dashboard', { replace: true });
  }, [isLoggedIn]);

  useEffect(() => {
    jacobRef.current = setInterval(() => {
      setJacobWelcome(p => (p + 1) % JACOB_WELCOMES.length);
      setJacobMood(p => p === 'happy' ? 'idle' : 'happy');
    }, 7000);
    return () => clearInterval(jacobRef.current);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 4500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setFeedOffset(p => p + 1), 2800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setPricingTier(v => (v + 1) % 2), 3500);
    return () => clearInterval(t);
  }, []);

  /* ── Particle config ── */
  const particleOptions = {
    fullScreen: false,
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    particles: {
      color: { value: T.isDark ? '#1B4FBF' : '#6366F1' },
      links: {
        color: T.isDark ? '#1B4FBF' : '#6366F1',
        distance: 140,
        enable: true,
        opacity: T.isDark ? 0.15 : 0.12,
        width: 1,
      },
      move: { enable: true, speed: 0.6, direction: 'none', random: true, straight: false, outModes: 'out' },
      number: { density: { enable: true, area: 900 }, value: 60 },
      opacity: { value: T.isDark ? 0.5 : 0.4 },
      shape: { type: 'circle' },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'grab' },
        onClick: { enable: true, mode: 'push' },
      },
      modes: {
        grab: { distance: 160, links: { opacity: 0.4 } },
        push: { quantity: 2 },
      },
    },
  };

  /* ── Glass styles ── */
  const glass = {
    background: T.isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.55)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: T.isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(255,255,255,0.75)',
    boxShadow: T.isDark
      ? '0 8px 32px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.05)'
      : '0 8px 32px rgba(15,23,42,0.08), inset 0 1px 0 rgba(255,255,255,0.90)',
  };

  const glassStrong = {
    background: T.isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.72)',
    backdropFilter: 'blur(40px)',
    WebkitBackdropFilter: 'blur(40px)',
    border: T.isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(255,255,255,0.88)',
    boxShadow: T.isDark
      ? '0 20px 60px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.08)'
      : '0 20px 60px rgba(15,23,42,0.10), inset 0 1px 0 rgba(255,255,255,0.95)',
  };

  const divider = T.isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(255,255,255,0.50)';
  const txt = T.text;
  const muted = T.textMuted;
  const pageBg = T.isDark ? '#020617' : '#EFF6FF';

  return (
    <div style={{ background: pageBg, minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>

      {/* ── GLOBAL STYLES ── */}
      <style>{`
        @keyframes marquee-scroll { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes scanline {
          0%   { transform: translateY(-100%); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(600%); opacity: 0; }
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes glow-pulse {
          0%,100% { box-shadow: 0 0 20px rgba(27,79,191,0.3); }
          50%     { box-shadow: 0 0 40px rgba(27,79,191,0.6), 0 0 80px rgba(27,79,191,0.2); }
        }
        @keyframes float-y {
          0%,100% { transform: translateY(0px); }
          50%     { transform: translateY(-10px); }
        }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .glow-btn { animation: glow-pulse 3s ease-in-out infinite; }
        .float-badge { animation: float-y 3.5s ease-in-out infinite; }
        .float-badge-2 { animation: float-y 4.2s ease-in-out 0.8s infinite; }
        .spin-ring { animation: spin-slow 8s linear infinite; }
        .scan-line { animation: scanline 4s ease-in-out infinite; }
        .cursor-blink::after { content: '|'; animation: blink 1s step-end infinite; color: #1B4FBF; }
      `}</style>

      {/* ── Fixed background layer: grid + orbs ── */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: T.isDark
            ? 'linear-gradient(rgba(27,79,191,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(27,79,191,0.055) 1px, transparent 1px)'
            : 'linear-gradient(rgba(99,102,241,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.07) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: T.isDark
            ? 'radial-gradient(ellipse 80% 60% at 50% 40%, transparent 30%, rgba(2,6,23,0.85) 100%)'
            : 'radial-gradient(ellipse 80% 60% at 50% 40%, transparent 30%, rgba(239,246,255,0.75) 100%)',
        }} />
        {T.isDark ? (
          <>
            <div style={{ position: 'absolute', top: '-20vh', right: '-10vw', width: '65vw', height: '65vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(27,79,191,0.13) 0%, transparent 65%)', filter: 'blur(80px)' }} />
            <div style={{ position: 'absolute', bottom: '-15vh', left: '-15vw', width: '55vw', height: '55vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.09) 0%, transparent 65%)', filter: 'blur(80px)' }} />
            <div style={{ position: 'absolute', top: '45vh', left: '25vw', width: '38vw', height: '38vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 65%)', filter: 'blur(80px)' }} />
          </>
        ) : (
          <>
            <div style={{ position: 'absolute', top: '-10vh', right: '-5vw', width: '55vw', height: '55vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(27,79,191,0.15) 0%, transparent 65%)', filter: 'blur(80px)' }} />
            <div style={{ position: 'absolute', bottom: '-10vh', left: '-10vw', width: '50vw', height: '50vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 65%)', filter: 'blur(80px)' }} />
            <div style={{ position: 'absolute', top: '40vh', left: '20vw', width: '40vw', height: '40vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.10) 0%, transparent 65%)', filter: 'blur(80px)' }} />
          </>
        )}
      </div>

      {/* ── Content ── */}
      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ════════ NAVBAR ════════ */}
        <nav style={{
          position: 'sticky', top: 0, zIndex: 50,
          ...glass,
          borderRadius: 0,
          borderTop: 'none', borderLeft: 'none', borderRight: 'none',
          borderBottom: divider,
        }}>
          <div className="max-w-6xl mx-auto px-6" style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <img src="/scanone-logo-blue.png" alt="ScanOne" style={{ height: 42, objectFit: 'contain' }} />
              <div style={{ lineHeight: 1.15 }}>
                <div style={{ fontWeight: 900, fontSize: 16, letterSpacing: '-0.4px', color: txt }}>ScanOne</div>
                <div style={{ fontSize: 10, color: muted, fontWeight: 500 }}>Risk Exposure Platform</div>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-1">
              {[
                { label: 'How It Works', href: '#how-it-works' },
                { label: 'Pricing', href: '#pricing' },
                { label: 'Why Us', href: '/why-us' },
              ].map(link => (
                <a key={link.label} href={link.href} style={{ padding: '8px 14px', borderRadius: 10, fontSize: 13, fontWeight: 600, color: muted, textDecoration: 'none' }}>
                  {link.label}
                </a>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button onClick={toggleTheme} style={{ width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', background: T.isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)', border: 'none', cursor: 'pointer', color: muted }}>
                {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
              </button>
              {isLoggedIn ? (
                <>
                  <div className="hidden md:flex items-center gap-1.5" style={{ padding: '6px 12px', borderRadius: 10, fontSize: 11, fontWeight: 700, background: 'rgba(34,197,94,0.1)', color: '#16A34A', border: '1px solid rgba(34,197,94,0.2)' }}>
                    <UserCheck size={12} />
                    <span style={{ maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email}</span>
                    {isSuper && <span style={{ color: '#6366F1' }}>★</span>}
                  </div>
                  {[
                    { icon: User, label: 'Profile', path: '/profile' },
                    { icon: History, label: 'History', path: '/history' },
                    { icon: AlertOctagon, label: 'Vulns', path: '/vulns' },
                  ].map(({ icon: Icon, label, path }) => (
                    <button key={label} onClick={() => navigate(path)} className="hidden md:flex items-center gap-1.5" style={{ padding: '8px 12px', borderRadius: 10, background: 'none', border: divider, cursor: 'pointer', fontSize: 12, fontWeight: 600, color: muted }}>
                      <Icon size={13} />{label}
                    </button>
                  ))}
                  {isSuper && (
                    <button onClick={() => navigate('/admin')} className="hidden md:flex items-center gap-1.5" style={{ padding: '8px 12px', borderRadius: 10, background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)', cursor: 'pointer', fontSize: 12, fontWeight: 600, color: '#818CF8' }}>
                      <LayoutDashboard size={13} />Admin
                    </button>
                  )}
                  <button onClick={logout} style={{ padding: '8px 10px', borderRadius: 10, background: 'none', border: 'none', cursor: 'pointer', color: muted }}>
                    <LogOut size={15} />
                  </button>
                  <button onClick={startScan} className="glow-btn" style={{ padding: '9px 18px', borderRadius: 12, background: 'linear-gradient(135deg, #1B4FBF 0%, #163FA0 100%)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                    Start Assessment <ArrowRight size={13} />
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => navigate('/login')} style={{ padding: '9px 16px', borderRadius: 12, background: 'transparent', border: `1.5px solid ${'#1B4FBF'}`, cursor: 'pointer', fontWeight: 700, fontSize: 13, color: '#1B4FBF', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <LogIn size={13} />Login
                  </button>
                  <button onClick={startScan} className="glow-btn" style={{ padding: '9px 18px', borderRadius: 12, background: 'linear-gradient(135deg, #1B4FBF 0%, #163FA0 100%)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                    Start Free Scan <ArrowRight size={13} />
                  </button>
                </>
              )}
            </div>
          </div>
        </nav>

        {/* ════════ HERO ════════ */}
        <section style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', padding: '60px 24px', position: 'relative', overflow: 'hidden' }}>

          {/* Particle network — fills entire hero */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            {particlesInit && (
              <Particles
                id="hero-particles"
                options={particleOptions}
                style={{ position: 'absolute', inset: 0 }}
              />
            )}
          </div>

          {/* Scanning line effect */}
          <div className="scan-line" style={{ position: 'absolute', left: 0, right: 0, height: 1, background: T.isDark ? 'linear-gradient(90deg, transparent, rgba(27,79,191,0.6), transparent)' : 'linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)', zIndex: 1, pointerEvents: 'none' }} />

          <div className="max-w-6xl mx-auto w-full" style={{ position: 'relative', zIndex: 2 }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* Left */}
              <div>
                {/* Trust badge */}
                <motion.div
                  initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 99, marginBottom: 32, background: T.isDark ? 'rgba(27,79,191,0.10)' : 'rgba(27,79,191,0.08)', border: '1px solid rgba(27,79,191,0.25)', fontSize: 12, fontWeight: 600, color: '#1B4FBF' }}>
                  <motion.span animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ width: 6, height: 6, borderRadius: '50%', background: '#1B4FBF', display: 'inline-block' }} />
                  Trusted by 500+ Nigerian businesses · NDPA 2023
                </motion.div>

                {/* Typewriter headline */}
                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
                  <h1 style={{ fontSize: 'clamp(40px, 5.5vw, 70px)', fontWeight: 900, lineHeight: 1.03, letterSpacing: '-2.5px', marginBottom: 24, color: txt }}>
                    Is Your<br />
                    Web Application<br />
                    <span style={{ background: 'linear-gradient(135deg, #1B4FBF 0%, #163FA0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', display: 'inline-block', minWidth: '2ch' }}>
                      <TypeAnimation
                        sequence={['Secure?', 3000, 'Exposed?', 2500, 'Protected?', 2500, 'Compliant?', 2500]}
                        wrapper="span"
                        speed={40}
                        deletionSpeed={60}
                        repeat={Infinity}
                      />
                    </span>
                  </h1>
                </motion.div>

                <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                  style={{ fontSize: 18, color: muted, lineHeight: 1.75, maxWidth: 460, marginBottom: 40 }}>
                  Find out in under 10 minutes. Our AI security engine scans your business website and delivers a clear, actionable report — mapped to NDPA 2023.
                </motion.p>

                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-wrap gap-3 mb-8">
                  <button onClick={startScan} className="glow-btn"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 32px', borderRadius: 14, background: 'linear-gradient(135deg, #1B4FBF 0%, #163FA0 100%)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 15 }}>
                    <Shield size={18} />
                    Run Security Assessment
                    <ArrowRight size={16} />
                  </button>
                  <a href="#how-it-works"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 24px', borderRadius: 14, ...glass, color: muted, textDecoration: 'none', fontWeight: 600, fontSize: 15, transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = txt}
                    onMouseLeave={e => e.currentTarget.style.color = muted}>
                    <Eye size={17} /> See How It Works
                  </a>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="flex flex-wrap gap-x-6 gap-y-2">
                  {['Free to start', 'Results in under 10 minutes', 'No technical knowledge needed'].map(t => (
                    <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: T.textLight }}>
                      <CheckCircle size={13} style={{ color: '#10B981' }} />{t}
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Right — Jacob glass card */}
              <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="flex flex-col items-center">

                {/* Outer decorative spinning ring */}
                <div style={{ position: 'relative', width: '100%', maxWidth: 400 }}>
                  <div className="spin-ring" style={{ position: 'absolute', inset: -20, borderRadius: 40, border: `1px solid ${'#1B4FBF'}18`, pointerEvents: 'none' }} />
                  <div className="spin-ring" style={{ position: 'absolute', inset: -36, borderRadius: 50, border: `1px dashed ${'#1B4FBF'}10`, animationDirection: 'reverse', animationDuration: '12s', pointerEvents: 'none' }} />

                  <div style={{ ...glassStrong, borderRadius: 28, padding: 32, width: '100%', position: 'relative', overflow: 'hidden' }}>
                    {/* Glow spot inside card */}
                    <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle, rgba(27,79,191,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
                      <motion.div style={{ width: 10, height: 10, borderRadius: '50%', background: '#22C55E' }}
                        animate={{ scale: [1, 1.45, 1], opacity: [1, 0.55, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                      <span style={{ fontSize: 13, fontWeight: 700, color: txt }}>Jacob Adeyemi</span>
                      <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 10px', borderRadius: 99, background: T.isDark ? 'rgba(27,79,191,0.15)' : '#FEF2F2', color: '#1B4FBF', border: '1px solid rgba(27,79,191,0.20)' }}>
                        Security Expert
                      </span>
                      {/* Live scanning indicator */}
                      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4, fontSize: 9, color: '#22C55E', fontWeight: 700 }}>
                        <motion.div style={{ width: 5, height: 5, borderRadius: '50%', background: '#22C55E' }}
                          animate={{ scale: [1, 1.6, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
                        LIVE
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                      <JacobAvatar mood={jacobMood} speaking={false} size={140} />
                      <AnimatePresence mode="wait">
                        <motion.div key={jacobWelcome} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4 }} style={{ width: '100%' }}>
                          <SpeechBubble text={JACOB_WELCOMES[jacobWelcome]} dark={T.isDark} />
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    <button onClick={startScan} style={{ marginTop: 20, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 13, borderRadius: 14, background: 'linear-gradient(135deg, #1B4FBF 0%, #163FA0 100%)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14, boxShadow: '0 4px 24px rgba(27,79,191,0.35)' }}>
                      <Zap size={16} /> Start My Scan with Jacob
                    </button>
                  </div>
                </div>

                {/* Floating badges */}
                <div className="flex justify-between w-full px-2 mt-5" style={{ maxWidth: 400 }}>
                  <div className="float-badge">
                    <GlowCard glowColor="#EF4444" style={{ ...glass, borderRadius: 14, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 8, background: T.isDark ? 'rgba(239,68,68,0.15)' : '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <AlertTriangle size={13} style={{ color: '#EF4444' }} />
                      </div>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: txt }}>Critical Found</div>
                        <div style={{ fontSize: 9, color: muted }}>DB port exposed</div>
                      </div>
                    </GlowCard>
                  </div>
                  <div className="float-badge-2">
                    <GlowCard glowColor="#10B981" style={{ ...glass, borderRadius: 14, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 8, background: T.isDark ? 'rgba(16,185,129,0.15)' : '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <CheckCircle size={13} style={{ color: '#10B981' }} />
                      </div>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: txt }}>NDPA Mapped</div>
                        <div style={{ fontSize: 9, color: muted }}>2023 compliant</div>
                      </div>
                    </GlowCard>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ════════ STATS ════════ */}
        <section style={{ padding: '80px 24px', borderTop: divider }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div data-aos="fade-up" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', color: T.textLight, marginBottom: 12 }}>By the numbers</div>
              <h2 data-aos="fade-up" data-aos-delay="80" style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 900, letterSpacing: '-1px', color: txt }}>
                Trusted across{' '}
                <span style={{ background: 'linear-gradient(135deg, #1B4FBF 0%, #163FA0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', display: 'inline-block', minWidth: '4ch' }}>
                  <TypeAnimation
                    sequence={['Nigeria', 2500, 'West-Africa', 2500, 'Africa', 2500, 'the World?', 2500]}
                    wrapper="span"
                    speed={45}
                    deletionSpeed={65}
                    repeat={Infinity}
                  />
                </span>
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {STATS.map((s, i) => <StatCard key={s.label} stat={s} index={i} T={T} glass={glass} />)}
            </div>
          </div>
        </section>

        {/* ════════ USE CASES ════════ */}
        <section style={{ padding: '80px 0', borderTop: divider }}>
          <div className="text-center mb-12 px-6">
            <div data-aos="fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px', borderRadius: 99, marginBottom: 16, background: T.isDark ? 'rgba(27,79,191,0.10)' : 'rgba(27,79,191,0.08)', border: '1px solid rgba(27,79,191,0.22)', fontSize: 11, fontWeight: 700, color: '#1B4FBF', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              What we check
            </div>
            <h2 data-aos="fade-up" data-aos-delay="80" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, letterSpacing: '-1px', color: txt, marginBottom: 12 }}>
              Eighteen Security{' '}
              <span style={{ background: 'linear-gradient(135deg, #1B4FBF 0%, #163FA0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Use Cases</span>
            </h2>
            <p data-aos="fade-up" data-aos-delay="140" style={{ fontSize: 15, color: muted, maxWidth: 420, margin: '0 auto' }}>
              Every scan covers 18 use cases — from passive recon to active DAST — across your entire attack surface.
            </p>
          </div>

          {/* Marquee */}
          <div style={{ overflow: 'hidden', maskImage: 'linear-gradient(90deg, transparent, black 7%, black 93%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 7%, black 93%, transparent)' }}>
            <div style={{ display: 'flex', gap: 12, padding: '4px 0 12px', animation: 'marquee-scroll 48s linear infinite', width: 'max-content' }}>
              {[...LANDING_USE_CASES, ...LANDING_USE_CASES].map((p, i) => (
                <div key={`${p.label}-${i}`} style={{ flexShrink: 0, width: 164, padding: 18, borderRadius: 18, ...glass, transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'default' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 12px 32px ${p.color}25`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = glass.boxShadow; }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: `${p.color}15`, border: `1px solid ${p.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 17, lineHeight: 1 }}>{p.icon}</span>
                    </div>
                    <span style={{ fontSize: 10, fontWeight: 900, color: T.isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)' }}>
                      {String((i % LANDING_USE_CASES.length) + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div style={{ fontSize: 11.5, fontWeight: 700, color: txt, marginBottom: 4, lineHeight: 1.3 }}>{p.label}</div>
                  <div style={{ fontSize: 10, color: muted, lineHeight: 1.4 }}>{p.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Report coverage */}
          <div className="max-w-6xl mx-auto px-6 mt-16">
            <div data-aos="fade-up" className="flex items-center gap-4 mb-6">
              <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.11em', color: T.textLight, whiteSpace: 'nowrap' }}>What your report covers</span>
              <div style={{ flex: 1, height: 1, background: T.isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)' }} />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {REVIEW_CAPS.map((cap, i) => (
                <GlowCard key={cap.label} glowColor={cap.color}
                  data-aos="fade-up" data-aos-delay={i * 50}
                  style={{ ...glass, borderRadius: 14, padding: 14, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 9, flexShrink: 0, background: `${cap.color}12`, border: `1px solid ${cap.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <cap.icon size={13} style={{ color: cap.color }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: txt, marginBottom: 3, lineHeight: 1.3 }}>{cap.label}</div>
                    <div style={{ fontSize: 10, color: muted }}>{cap.desc}</div>
                  </div>
                </GlowCard>
              ))}
            </div>
          </div>
        </section>

        {/* ════════ HOW IT WORKS ════════ */}
        <section id="how-it-works" style={{ padding: '100px 24px', borderTop: divider }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div data-aos="fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px', borderRadius: 99, marginBottom: 16, background: 'rgba(16,185,129,0.10)', border: '1px solid rgba(16,185,129,0.22)', fontSize: 11, fontWeight: 700, color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                How it works
              </div>
              <h2 data-aos="fade-up" data-aos-delay="80" style={{ fontSize: 'clamp(32px, 4.5vw, 54px)', fontWeight: 900, letterSpacing: '-1.5px', lineHeight: 1.04, color: txt }}>
                Zero to Report in{' '}
                <span style={{ background: 'linear-gradient(135deg, #1B4FBF 0%, #163FA0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>3 Steps</span>
              </h2>
              <p data-aos="fade-up" data-aos-delay="140" style={{ marginTop: 14, fontSize: 16, color: muted, maxWidth: 340, margin: '14px auto 0' }}>
                No security team. No configuration. Just enter your domain.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Step 1 */}
              <GlowCard glowColor="#1B4FBF" data-aos="fade-up" data-aos-delay="0"
                style={{ ...glass, borderRadius: 24, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '22px 22px 18px', display: 'flex', alignItems: 'center', gap: 14, borderBottom: divider }}>
                  <div style={{ width: 40, height: 40, borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 16, flexShrink: 0, background: 'rgba(27,79,191,0.12)', border: '1px solid rgba(27,79,191,0.28)', color: '#1B4FBF' }}>1</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: txt }}>Enter Your Domain</div>
                    <div style={{ fontSize: 11, color: muted }}>Takes 30 seconds</div>
                  </div>
                </div>
                <div style={{ padding: 20, flex: 1 }}>
                  <div style={{ borderRadius: 16, padding: 16, background: T.isDark ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.45)', border: divider }}>
                    <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: T.textLight, marginBottom: 8 }}>Domain / URL</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px', borderRadius: 10, background: T.isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)', border: '1px solid rgba(27,79,191,0.25)', marginBottom: 12 }}>
                      <Globe size={12} style={{ color: '#1B4FBF', flexShrink: 0 }} />
                      <span style={{ fontSize: 12, fontFamily: 'monospace', color: muted }}>yourcompany.ng</span>
                      <motion.div style={{ width: 2, height: 14, background: '#1B4FBF', borderRadius: 2 }}
                        animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} />
                    </div>
                    <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: T.textLight, marginBottom: 8 }}>Industry</div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {['Fintech', 'Banks', 'Capital Market'].map((t, ti) => (
                        <div key={t} style={{ padding: '4px 10px', borderRadius: 8, fontSize: 10, fontWeight: 700, background: ti === 0 ? 'rgba(27,79,191,0.12)' : T.isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)', color: ti === 0 ? '#1B4FBF' : T.textLight, border: ti === 0 ? '1px solid rgba(27,79,191,0.3)' : divider }}>
                          {t}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </GlowCard>

              {/* Step 2 — featured */}
              <GlowCard glowColor="#1B4FBF" data-aos="fade-up" data-aos-delay="100"
                style={{ ...glass, borderRadius: 24, overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '1px solid rgba(27,79,191,0.22)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${'#1B4FBF'}, transparent)` }} />
                <div style={{ padding: '22px 22px 18px', display: 'flex', alignItems: 'center', gap: 14, borderBottom: divider }}>
                  <div style={{ width: 40, height: 40, borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 16, flexShrink: 0, background: 'rgba(27,79,191,0.12)', border: '1px solid rgba(27,79,191,0.35)', color: '#1B4FBF', position: 'relative' }}>
                    2
                    <motion.div style={{ position: 'absolute', inset: 0, borderRadius: 13, border: '1px solid rgba(27,79,191,0.6)' }}
                      animate={{ scale: [1, 1.5, 1.5], opacity: [0.6, 0, 0] }} transition={{ duration: 1.8, repeat: Infinity }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: txt }}>We Scan Automatically</div>
                    <div style={{ fontSize: 11, color: muted }}>13 phases · parallel · live</div>
                  </div>
                </div>
                <div style={{ padding: 20, flex: 1 }}>
                  <div style={{ borderRadius: 16, overflow: 'hidden', background: '#0A0F1A', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 12px', background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      {['#EF4444','#F59E0B','#22C55E'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
                      <span style={{ fontSize: 9, marginLeft: 4, fontFamily: 'monospace', color: 'rgba(255,255,255,0.2)' }}>vapt-engine — scan</span>
                    </div>
                    <div style={{ padding: 12, fontFamily: 'monospace', fontSize: 10 }}>
                      {[
                        { text: '▶ Recon & DNS mapping',   color: '#22C55E', done: true,  delay: 0   },
                        { text: '▶ VirusTotal reputation', color: '#22C55E', done: true,  delay: 0.2 },
                        { text: '▶ Header security audit', color: '#22C55E', done: true,  delay: 0.4 },
                        { text: '▶ SSL/TLS certificate',   color: '#FCD34D', done: false, delay: 0.6 },
                        { text: '▶ DAST scan...',      color: '#FCD34D', done: false, delay: 0.8 },
                        { text: '▶ Deep Web intelligence',   color: 'rgba(255,255,255,0.15)', done: false, delay: 1.0 },
                      ].map(line => (
                        <motion.div key={line.text} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }} transition={{ delay: 0.5 + line.delay, duration: 0.3 }}
                          style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
                          {line.done
                            ? <span style={{ color: '#22C55E' }}>✓</span>
                            : <motion.span style={{ color: line.color }}
                                animate={line.color !== 'rgba(255,255,255,0.15)' ? { opacity: [1, 0.3, 1] } : {}}
                                transition={{ duration: 1, repeat: Infinity }}>◉</motion.span>
                          }
                          <span style={{ color: line.color }}>{line.text}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </GlowCard>

              {/* Step 3 */}
              <GlowCard glowColor="#10B981" data-aos="fade-up" data-aos-delay="200"
                style={{ ...glass, borderRadius: 24, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '22px 22px 18px', display: 'flex', alignItems: 'center', gap: 14, borderBottom: divider }}>
                  <div style={{ width: 40, height: 40, borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 16, flexShrink: 0, background: 'rgba(27,79,191,0.12)', border: '1px solid rgba(27,79,191,0.25)', color: '#1B4FBF' }}>3</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: txt }}>Get Your Report</div>
                    <div style={{ fontSize: 11, color: muted }}>PDF · NDPA mapped · plain language</div>
                  </div>
                </div>
                <div style={{ padding: 20, flex: 1 }}>
                  <div style={{ borderRadius: 16, padding: 16, background: T.isDark ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.45)', border: divider }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                      <div>
                        <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: T.textLight, marginBottom: 4 }}>Security Score</div>
                        <div style={{ fontSize: 32, fontWeight: 900, color: '#F59E0B', lineHeight: 1 }}>61<span style={{ fontSize: 14, color: muted, fontWeight: 500 }}>/100</span></div>
                      </div>
                      <motion.div animate={{ boxShadow: ['0 0 0px rgba(245,158,11,0)', '0 0 16px rgba(245,158,11,0.5)', '0 0 0px rgba(245,158,11,0)'] }} transition={{ duration: 2.5, repeat: Infinity }}
                        style={{ width: 44, height: 44, borderRadius: 12, border: '2px solid #F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 20, color: '#F59E0B', background: 'rgba(245,158,11,0.10)' }}>C</motion.div>
                    </div>
                    {[['CRITICAL','#EF4444',2,100],['HIGH','#F59E0B',5,55],['MEDIUM','#FB923C',9,35]].map(([label, color, count, w]) => (
                      <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <div style={{ fontSize: 9, fontWeight: 700, width: 52, flexShrink: 0, color }}>{label}</div>
                        <div style={{ flex: 1, height: 4, borderRadius: 99, overflow: 'hidden', background: T.isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)' }}>
                          <motion.div style={{ height: '100%', borderRadius: 99, background: color }}
                            initial={{ width: 0 }} whileInView={{ width: `${w}%` }}
                            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }} />
                        </div>
                        <div style={{ fontSize: 9, fontWeight: 700, color, width: 12, textAlign: 'right' }}>{count}</div>
                      </div>
                    ))}
                    <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
                      <span style={{ fontSize: 9, padding: '3px 8px', borderRadius: 99, fontWeight: 700, background: 'rgba(16,185,129,0.12)', color: '#10B981', border: '1px solid rgba(16,185,129,0.22)' }}>NDPA §24 Mapped</span>
                      <span style={{ fontSize: 9, padding: '3px 8px', borderRadius: 99, fontWeight: 700, background: 'rgba(99,102,241,0.12)', color: '#818CF8', border: '1px solid rgba(99,102,241,0.22)' }}>12-Page PDF</span>
                    </div>
                  </div>
                </div>
              </GlowCard>
            </div>

            <div className="text-center mt-14">
              <button data-aos="zoom-in" onClick={startScan} className="glow-btn"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 36px', borderRadius: 16, background: 'linear-gradient(135deg, #1B4FBF 0%, #163FA0 100%)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 16 }}>
                <Zap size={18} /> Start My Security Assessment <ArrowRight size={16} />
              </button>
              <p style={{ marginTop: 12, fontSize: 12, color: T.textLight }}>Free · No credit card · Results in under 10 minutes</p>
            </div>
          </div>
        </section>

        {/* ════════ COMPLIANCE ════════ */}
        <section style={{ padding: '100px 24px', borderTop: divider }}>
          <div className="max-w-5xl mx-auto">

            {/* Header */}
            <div className="text-center mb-16">
              <div data-aos="fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px', borderRadius: 99, marginBottom: 16, background: T.isDark ? 'rgba(27,79,191,0.10)' : 'rgba(27,79,191,0.08)', border: '1px solid rgba(27,79,191,0.22)', fontSize: 11, fontWeight: 700, color: '#1B4FBF', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Built for Compliance
              </div>
              <h2 data-aos="fade-up" data-aos-delay="80" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, letterSpacing: '-1px', lineHeight: 1.1, color: txt, marginBottom: 16 }}>
                Every Finding Mapped{' '}
                <span style={{ background: 'linear-gradient(135deg, #1B4FBF 0%, #163FA0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>to the Right Law</span>
              </h2>
              <p data-aos="fade-up" data-aos-delay="140" style={{ fontSize: 16, color: muted, maxWidth: 480, margin: '0 auto' }}>
                Vulnerabilities are automatically cross-referenced against NDPA 2023, OWASP, CBN RBCF, and PCI DSS 4.0.
              </p>
            </div>

            {/* Selector tabs */}
            <div data-aos="fade-up" style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 40 }}>
              {COMPLIANCE_FINDINGS.map((f, i) => (
                <button key={i} onClick={() => setActiveFinding(i)} style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '9px 20px', borderRadius: 99,
                  border: activeFinding === i ? `1.5px solid ${f.sevColor}` : `1.5px solid ${T.isDark ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.08)'}`,
                  background: activeFinding === i ? `${f.sevColor}12` : 'transparent',
                  cursor: 'pointer', transition: 'all 0.2s',
                  fontSize: 12, fontWeight: 700, color: activeFinding === i ? f.sevColor : muted,
                }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: f.sevColor, opacity: activeFinding === i ? 1 : 0.35, display: 'inline-block', flexShrink: 0 }} />
                  {f.sev}
                </button>
              ))}
            </div>

            {/* Main card */}
            <AnimatePresence mode="wait">
              <motion.div key={activeFinding} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}
                data-aos="fade-up"
                style={{ ...glassStrong, borderRadius: 24, overflow: 'hidden' }}>
                <div className="grid grid-cols-1 lg:grid-cols-2">

                  {/* Left — Finding */}
                  <div style={{ padding: '40px 36px', borderRight: divider }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                      <span style={{ fontSize: 11, fontWeight: 800, padding: '4px 12px', borderRadius: 99, background: `${COMPLIANCE_FINDINGS[activeFinding].sevColor}14`, color: COMPLIANCE_FINDINGS[activeFinding].sevColor, border: `1px solid ${COMPLIANCE_FINDINGS[activeFinding].sevColor}30` }}>
                        {COMPLIANCE_FINDINGS[activeFinding].sev}
                      </span>
                      <span style={{ fontSize: 11, fontWeight: 600, color: muted, fontFamily: 'JetBrains Mono, monospace' }}>CVSS {COMPLIANCE_FINDINGS[activeFinding].cvss}</span>
                    </div>
                    <h3 style={{ fontSize: 22, fontWeight: 800, color: txt, letterSpacing: '-0.5px', marginBottom: 14, lineHeight: 1.2 }}>
                      {COMPLIANCE_FINDINGS[activeFinding].title}
                    </h3>
                    <p style={{ fontSize: 14, color: muted, lineHeight: 1.75, marginBottom: 28 }}>
                      {COMPLIANCE_FINDINGS[activeFinding].desc}
                    </p>
                    <div style={{ paddingTop: 20, borderTop: divider }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: muted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Remediation</div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                        <CheckCircle size={14} style={{ color: '#10B981', flexShrink: 0, marginTop: 2 }} />
                        <span style={{ fontSize: 13, color: txt, lineHeight: 1.6 }}>{COMPLIANCE_FINDINGS[activeFinding].fix}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right — Framework mappings */}
                  <div style={{ padding: '40px 36px', display: 'flex', flexDirection: 'column', gap: 0 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: muted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>
                      Regulatory Cross-Reference
                    </div>
                    {COMPLIANCE_FINDINGS[activeFinding].mappings.map((m, i) => (
                      <div key={m.fw} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 0', borderBottom: i < 3 ? divider : 'none' }}>
                        <div style={{ width: 3, height: 36, borderRadius: 2, background: m.color, flexShrink: 0 }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                            <span style={{ fontSize: 13, fontWeight: 700, color: txt }}>{m.fw}</span>
                            <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 6, background: `${m.color}12`, color: m.color, fontFamily: 'JetBrains Mono, monospace', border: `1px solid ${m.color}25` }}>{m.section}</span>
                          </div>
                          <div style={{ fontSize: 12, color: muted }}>{m.rule}</div>
                        </div>
                      </div>
                    ))}
                    <div style={{ marginTop: 20, display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                      <AlertTriangle size={13} style={{ color: '#EF4444', flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontSize: 12, color: muted, lineHeight: 1.6 }}>{COMPLIANCE_FINDINGS[activeFinding].penalty}</span>
                    </div>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>

            {/* Framework strip */}
            <div data-aos="fade-up" className="flex flex-wrap justify-center gap-3 mt-10">
              {[
                { label: 'NDPA 2023',    color: '#1B4FBF', ref: 'Sections 24–26'       },
                { label: 'OWASP Top 10', color: '#6366F1', ref: 'A01–A10'              },
                { label: 'CBN RBCF',     color: '#0EA5E9', ref: 'Chapters 3, 4, 5'     },
                { label: 'PCI DSS 4.0',  color: '#10B981', ref: 'Req. 4, 6, 12'        },
              ].map(fw => (
                <div key={fw.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 99, ...glass, fontSize: 12, fontWeight: 600 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: fw.color, flexShrink: 0 }} />
                  <span style={{ color: txt }}>{fw.label}</span>
                  <span style={{ color: muted, fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}>{fw.ref}</span>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ════════ PRICING ════════ */}
        <section id="pricing" style={{ padding: '64px 24px', borderTop: divider }}>
          <div className="max-w-5xl mx-auto">

            <div data-aos="fade-up" style={{ textAlign: 'center', marginBottom: 28 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 99, marginBottom: 12, background: T.isDark ? 'rgba(27,79,191,0.10)' : 'rgba(27,79,191,0.08)', border: '1px solid rgba(27,79,191,0.22)', fontSize: 10, fontWeight: 700, color: '#1B4FBF', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                <Zap size={9} /> Pricing
              </div>
              <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 900, color: txt, margin: '0 0 8px', letterSpacing: '-0.4px' }}>
                One flat cost. Everything included.
              </h2>
              <p style={{ fontSize: 14, color: muted, margin: 0 }}>
                SP (ScanPoints) is the fuel of ScanOne — no subscription, no hidden fees.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>

              {/* Card 1 — alternating cost */}
              <div data-aos="fade-up" data-aos-delay="0"
                style={{ borderRadius: 16, padding: '20px 20px', background: T.isDark ? 'rgba(27,79,191,0.08)' : 'rgba(27,79,191,0.05)', border: '1px solid rgba(27,79,191,0.2)', position: 'relative', overflow: 'hidden', minHeight: 120 }}>
                <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: 'radial-gradient(circle, rgba(27,79,191,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1B4FBF', marginBottom: 8 }}>Per assessment</div>
                <AnimatePresence mode="wait">
                  {pricingTier === 0 ? (
                    <motion.div key="t0" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.35 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, marginBottom: 4 }}>
                        <span style={{ fontSize: 40, fontWeight: 900, fontFamily: 'JetBrains Mono, monospace', color: txt, lineHeight: 1, letterSpacing: '-2px' }}>90</span>
                        <span style={{ fontSize: 16, fontWeight: 900, fontFamily: 'JetBrains Mono, monospace', color: '#6366F1', marginBottom: 4 }}>SP</span>
                      </div>
                      <p style={{ fontSize: 11, color: muted, margin: '0 0 4px', lineHeight: 1.5 }}>for capital markets</p>
                      <p style={{ fontSize: 11, color: muted, margin: 0, lineHeight: 1.5 }}>18 use cases · QA PDF</p>
                    </motion.div>
                  ) : (
                    <motion.div key="t1" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.35 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, marginBottom: 4 }}>
                        <span style={{ fontSize: 40, fontWeight: 900, fontFamily: 'JetBrains Mono, monospace', color: txt, lineHeight: 1, letterSpacing: '-2px' }}>150</span>
                        <span style={{ fontSize: 16, fontWeight: 900, fontFamily: 'JetBrains Mono, monospace', color: '#6366F1', marginBottom: 4 }}>SP</span>
                      </div>
                      <p style={{ fontSize: 11, color: muted, margin: '0 0 4px', lineHeight: 1.5 }}>for other markets</p>
                      <p style={{ fontSize: 11, color: muted, margin: 0, lineHeight: 1.5 }}>18 use cases · <em style={{ fontStyle: 'italic', fontWeight: 700, color: '#EF4444' }}>DAST</em> · QA PDF</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Card 2 — free SP */}
              <div data-aos="fade-up" data-aos-delay="80"
                style={{ borderRadius: 16, padding: '20px 20px', background: T.isDark ? 'rgba(34,197,94,0.06)' : 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                  <Star size={12} style={{ color: '#22C55E' }} />
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#22C55E' }}>Free on signup</span>
                </div>
                <div style={{ fontSize: 40, fontWeight: 900, fontFamily: 'JetBrains Mono, monospace', color: '#22C55E', lineHeight: 1, letterSpacing: '-2px', marginBottom: 4 }}>
                  50 <span style={{ fontSize: 16, marginLeft: 1 }}>SP</span>
                </div>
                <p style={{ fontSize: 12, color: muted, margin: 0, lineHeight: 1.5 }}>Top up 40 SP more — your first scan costs you almost nothing.</p>
              </div>

              {/* Card 3 — includes */}
              <div data-aos="fade-up" data-aos-delay="160"
                style={{ borderRadius: 16, padding: '20px 20px', background: T.isDark ? 'rgba(15,23,42,0.5)' : 'rgba(255,255,255,0.8)', border: `1px solid ${T.isDark ? 'rgba(255,255,255,0.07)' : '#E2E8F0'}` }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: muted, marginBottom: 10 }}>Includes</div>
                {['No contracts or NDAs', 'Results in < 10 minutes', 'Rescan anytime'].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 7 }}>
                    <CheckCircle size={11} style={{ color: '#10B981', flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: T.text, fontWeight: 500 }}>{item}</span>
                  </div>
                ))}
              </div>

              {/* Card 4 — CTA */}
              <div data-aos="fade-up" data-aos-delay="240"
                style={{ borderRadius: 16, padding: '20px 20px', background: 'linear-gradient(135deg, #1B4FBF 0%, #163FA0 100%)', border: '1px solid rgba(27,79,191,0.4)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>Need more SP?</div>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', margin: '0 0 16px', lineHeight: 1.5 }}>Provisioned directly by the Ethnos team — no gateway, no auto-billing.</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <button onClick={() => navigate(isLoggedIn ? '/scan-setup' : '/signup')}
                    style={{ width: '100%', padding: '10px 0', borderRadius: 10, border: 'none', cursor: 'pointer', background: '#fff', color: '#1B4FBF', fontSize: 13, fontWeight: 700 }}>
                    Get started
                  </button>
                  <a href="mailto:somtochukwu.okoma@ethnoscyber.com?subject=ScanPoints%20Request"
                    style={{ width: '100%', padding: '9px 0', borderRadius: 10, border: '1px solid rgba(255,255,255,0.25)', background: 'transparent', color: '#fff', fontSize: 12, fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                    <Mail size={11} /> Request SP
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ════════ TESTIMONIALS ════════ */}
        <section style={{ padding: '100px 24px', borderTop: divider }}>
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <div data-aos="fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px', borderRadius: 99, marginBottom: 16, background: T.isDark ? 'rgba(245,158,11,0.10)' : '#FFFBEB', border: '1px solid rgba(245,158,11,0.25)', fontSize: 11, fontWeight: 700, color: '#F59E0B', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Client feedback
                </div>
                <h2 data-aos="fade-up" data-aos-delay="80" style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 900, letterSpacing: '-1px', lineHeight: 1.1, color: txt }}>
                  What security leaders<br />say about us.
                </h2>
              </div>
              <div data-aos="fade-up" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {[0,1,2,3,4].map(s => <Star key={s} size={16} style={{ fill: '#FBBF24', color: '#FBBF24' }} />)}
                <span style={{ marginLeft: 8, fontSize: 13, fontWeight: 600, color: muted }}>5.0 · 200+ scans</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-stretch">
              <motion.div className="md:col-span-3" data-aos="fade-right"
                style={{
                  ...glassStrong, borderRadius: 24, padding: 32,
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  position: 'relative', overflow: 'hidden',
                  background: T.isDark ? `${TESTIMONIALS[activeTestimonial].color}0D` : `${TESTIMONIALS[activeTestimonial].color}08`,
                  border: `1px solid ${TESTIMONIALS[activeTestimonial].color}25`,
                  transition: 'background 0.8s ease, border-color 0.8s ease',
                }}>
                <div style={{ position: 'absolute', top: 14, right: 22, fontSize: '7rem', fontWeight: 900, color: `${TESTIMONIALS[activeTestimonial].color}15`, lineHeight: 1, fontFamily: 'Georgia, serif', pointerEvents: 'none', transition: 'color 0.8s' }}>"</div>
                <AnimatePresence mode="wait">
                  <motion.div key={`fq-${activeTestimonial}`} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', gap: 2, marginBottom: 20 }}>
                      {[0,1,2,3,4].map(s => <Star key={s} size={14} style={{ fill: '#FBBF24', color: '#FBBF24' }} />)}
                    </div>
                    <p style={{ fontSize: 'clamp(15px, 2vw, 21px)', fontWeight: 500, lineHeight: 1.65, color: txt }}>
                      "{TESTIMONIALS[activeTestimonial].text}"
                    </p>
                  </motion.div>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  <motion.div key={`fa-${activeTestimonial}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, delay: 0.1 }}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 20, marginTop: 24, borderTop: `1px solid ${TESTIMONIALS[activeTestimonial].color}20`, position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: TESTIMONIALS[activeTestimonial].color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 13, color: '#fff', flexShrink: 0 }}>
                        {TESTIMONIALS[activeTestimonial].initials}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14, color: txt }}>{TESTIMONIALS[activeTestimonial].name}</div>
                        <div style={{ fontSize: 12, color: muted }}>{TESTIMONIALS[activeTestimonial].role}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 10, fontWeight: 700, padding: '5px 12px', borderRadius: 99, background: `${TESTIMONIALS[activeTestimonial].color}18`, color: TESTIMONIALS[activeTestimonial].color }}>
                      {TESTIMONIALS[activeTestimonial].company}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              <div className="md:col-span-2 flex flex-col gap-4" data-aos="fade-left">
                {[1, 2].map(offset => {
                  const t = TESTIMONIALS[(activeTestimonial + offset) % TESTIMONIALS.length];
                  return (
                    <div key={offset} style={{ ...glass, borderRadius: 20, padding: 24, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <AnimatePresence mode="wait">
                        <motion.div key={`s${offset}-${activeTestimonial}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>
                          <div style={{ display: 'flex', gap: 2, marginBottom: 10 }}>
                            {[0,1,2,3,4].map(s => <Star key={s} size={11} style={{ fill: '#FBBF24', color: '#FBBF24' }} />)}
                          </div>
                          <p style={{ fontSize: 13, color: muted, lineHeight: 1.65, marginBottom: 16 }}>"{t.text}"</p>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 14, borderTop: divider }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                              <div style={{ width: 30, height: 30, borderRadius: '50%', background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 11, color: '#fff', flexShrink: 0 }}>{t.initials}</div>
                              <div>
                                <div style={{ fontWeight: 700, fontSize: 12, color: txt }}>{t.name}</div>
                                <div style={{ fontSize: 10, color: muted }}>{t.role}</div>
                              </div>
                            </div>
                            <div style={{ fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 99, background: `${t.color}15`, color: t.color, border: `1px solid ${t.color}30`, flexShrink: 0 }}>{t.company}</div>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-center items-center gap-2 mt-8">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setActiveTestimonial(i)}
                  style={{ borderRadius: 99, border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.4s ease', width: i === activeTestimonial ? 24 : 8, height: 8, background: i === activeTestimonial ? TESTIMONIALS[activeTestimonial].color : T.isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)' }} />
              ))}
            </div>
          </div>
        </section>

        {/* ════════ FINAL CTA ════════ */}
        <section style={{ padding: '100px 24px', borderTop: divider }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div data-aos="fade-right">
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 99, marginBottom: 28, background: 'rgba(27,79,191,0.10)', border: '1px solid rgba(27,79,191,0.22)', fontSize: 12, fontWeight: 600, color: '#1B4FBF' }}>
                  <motion.span animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ width: 7, height: 7, borderRadius: '50%', background: '#EF4444', display: 'inline-block' }} />
                  Your exposure window is open
                </div>
                <h2 style={{ fontSize: 'clamp(32px, 4vw, 54px)', fontWeight: 900, letterSpacing: '-1.5px', lineHeight: 1.07, marginBottom: 20, color: txt }}>
                  Don't wait to find out<br />
                  <span style={{ color: '#1B4FBF' }}>the hard way.</span>
                </h2>
                <p style={{ fontSize: 17, color: muted, lineHeight: 1.75, marginBottom: 32 }}>
                  500+ Nigerian businesses have already scanned their websites.{' '}
                  Most found at least one critical issue they didn't know existed.
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  <button onClick={startScan} className="glow-btn"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 14, background: 'linear-gradient(135deg, #1B4FBF 0%, #163FA0 100%)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 15 }}>
                    <Shield size={18} /> Start Free Scan <ArrowRight size={16} />
                  </button>
                  <a href="/why-us" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '14px 22px', borderRadius: 14, ...glass, color: muted, textDecoration: 'none', fontWeight: 600, fontSize: 15 }}>
                    Why ScanOne <ChevronRight size={15} />
                  </a>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[{ icon: Lock, label: 'Free to start' }, { icon: CheckCircle, label: 'NDPA 2023 ready' }, { icon: Zap, label: 'Results in 10 min' }].map(({ icon: Icon, label }) => (
                    <div key={label} style={{ ...glass, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 99, fontSize: 12, fontWeight: 600, color: muted }}>
                      <Icon size={12} style={{ color: '#10B981' }} />{label}
                    </div>
                  ))}
                </div>
              </div>

              <div data-aos="fade-left" data-aos-delay="100">
                <GlowCard glowColor="#1B4FBF" style={{ ...glassStrong, borderRadius: 20, overflow: 'hidden' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: divider }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {['#EF4444','#F59E0B','#22C55E'].map(c => <div key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />)}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontFamily: 'monospace', color: T.textLight }}>
                      <motion.span animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E', display: 'inline-block' }} />
                      Live Scan Activity
                    </div>
                    <div style={{ width: 52 }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderBottom: divider }}>
                    {[{ value: '247', label: 'Scans / month' }, { value: '1,829', label: 'Issues flagged' }, { value: '< 10m', label: 'Avg. scan time' }].map(({ value, label }, i) => (
                      <div key={label} style={{ padding: 16, textAlign: 'center', borderRight: i < 2 ? divider : 'none' }}>
                        <div style={{ fontSize: 20, fontWeight: 900, fontFamily: 'monospace', color: txt }}>{value}</div>
                        <div style={{ fontSize: 10, color: T.textLight, marginTop: 2 }}>{label}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: 20 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: T.textLight, marginBottom: 12 }}>Recent scan results</div>
                    <AnimatePresence mode="wait">
                      <motion.div key={feedOffset} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
                        {Array.from({ length: 4 }, (_, i) => LIVE_FEED[(feedOffset + i) % LIVE_FEED.length]).map(item => (
                          <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px', marginBottom: 6, height: 42, borderRadius: 10, background: T.isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.5)', border: divider }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ width: 6, height: 6, borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                              <span style={{ fontSize: 12, fontFamily: 'monospace', color: muted }}>{item.domain}</span>
                            </div>
                            <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 6, background: `${item.color}18`, color: item.color }}>{item.sev}</span>
                          </div>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <div style={{ padding: '0 20px 14px', textAlign: 'center', fontSize: 10, color: T.textLight }}>
                     · Real results vary by target
                  </div>
                </GlowCard>
              </div>
            </div>
          </div>
        </section>

        {/* ════════ FOOTER ════════ */}
        <footer style={{ borderTop: divider, padding: '32px 24px' }}>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <img src="/scanone-logo-blue.png" alt="ScanOne" style={{ height: 36, objectFit: 'contain' }} />
              <div>
                <div style={{ fontWeight: 900, fontSize: 14, color: txt, lineHeight: 1.1 }}>ScanOne</div>
                <div style={{ fontSize: 9, color: muted }}>Risk Exposure Platform</div>
              </div>
            </div>
            <p style={{ fontSize: 11, color: T.textLight, textAlign: 'center' }}>
              For authorised security assessments only. Unauthorised scanning is illegal and unethical.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}>
              {[
                { label: 'FAQ', href: '/faq' },
                { label: 'NDPA 2023', href: 'https://ndpc.gov.ng', ext: true },
                { label: 'OWASP Top 10', href: 'https://owasp.org/Top10/', ext: true },
                { label: 'CBN Framework', href: 'https://www.cbn.gov.ng/Out/2022/FPRD/CBN%20Risk-Based%20Cybersecurity%20Framework.pdf', ext: true },
              ].map((link, i) => (
                <span key={link.label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  {i > 0 && <span style={{ color: T.textLight, padding: '0 2px' }}>·</span>}
                  <a href={link.href} target={link.ext ? '_blank' : '_self'} rel={link.ext ? 'noopener noreferrer' : undefined}
                    style={{ color: muted, textDecoration: 'none', fontWeight: 500 }}
                    onMouseEnter={e => e.currentTarget.style.color = txt}
                    onMouseLeave={e => e.currentTarget.style.color = muted}>
                    {link.label}
                  </a>
                </span>
              ))}
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
