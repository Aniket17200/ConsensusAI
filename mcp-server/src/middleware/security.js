// Default middleware function that just calls next()
const passThroughMiddleware = (req, res, next) => next();

// Try to load each security module with fallbacks
let helmet, rateLimit, cors, xss, hpp;

try { helmet = require('helmet'); } catch (e) { console.warn('Helmet not available'); }
try { rateLimit = require('express-rate-limit'); } catch (e) { console.warn('Rate limit not available'); }
try { cors = require('cors'); } catch (e) { console.warn('CORS not available'); }
try { xss = require('xss-clean'); } catch (e) { console.warn('XSS-clean not available'); }
try { hpp = require('hpp'); } catch (e) { console.warn('HPP not available'); }

// Set security headers
exports.securityHeaders = helmet ? helmet() : passThroughMiddleware;

// Rate limiting
exports.rateLimiter = rateLimit ? rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again after 10 minutes'
}) : passThroughMiddleware;

// Enable CORS
exports.corsMiddleware = cors ? cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.CORS_ORIGIN || false
    : true,
  credentials: true
}) : passThroughMiddleware;

// Prevent XSS attacks
exports.xssProtection = xss ? xss() : passThroughMiddleware;

// Prevent HTTP Parameter Pollution
exports.preventParamPollution = hpp ? hpp() : passThroughMiddleware;

// Error handler
exports.errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  res.status(err.statusCode || 500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' 
      ? 'Server Error' 
      : err.message
  });
};