// Analytics tracking functions that respect cookie consent
export class Analytics {
  private static instance: Analytics;
  private consent: any = null;

  private constructor() {}

  static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  setConsent(consent: any) {
    this.consent = consent;
  }

  // Page view tracking
  trackPageView(page: string, title?: string) {
    if (!this.consent?.analytics) {
      console.log('Analytics tracking disabled by user consent');
      return;
    }

    // Custom analytics tracking
    this.sendAnalyticsEvent('page_view', {
      page,
      title: title || page,
      url: typeof window !== 'undefined' ? window.location.href : '',
      timestamp: new Date().toISOString(),
    });
  }

  // Event tracking
  trackEvent(eventName: string, parameters: Record<string, any> = {}) {
    if (!this.consent?.analytics) {
      console.log('Analytics tracking disabled by user consent');
      return;
    }

    // Custom analytics tracking
    this.sendAnalyticsEvent(eventName, {
      ...parameters,
      timestamp: new Date().toISOString(),
    });
  }

  // Form submission tracking
  trackFormSubmission(formName: string, formData: Record<string, any> = {}) {
    this.trackEvent('form_submit', {
      form_name: formName,
      form_data: formData,
    });
  }

  // Button click tracking
  trackButtonClick(buttonName: string, buttonLocation: string) {
    this.trackEvent('button_click', {
      button_name: buttonName,
      button_location: buttonLocation,
    });
  }

  // Contact tracking
  trackContact(method: string, details: Record<string, any> = {}) {
    this.trackEvent('contact', {
      contact_method: method,
      ...details,
    });
  }

  // Quote request tracking
  trackQuoteRequest(quoteData: Record<string, any> = {}) {
    this.trackEvent('quote_request', {
      ...quoteData,
    });
  }

  // Marketing tracking (only if marketing consent is given)
  trackMarketingEvent(eventName: string, parameters: Record<string, any> = {}) {
    if (!this.consent?.marketing) {
      console.log('Marketing tracking disabled by user consent');
      return;
    }

    // Custom marketing tracking
    this.sendMarketingEvent(eventName, {
      ...parameters,
      timestamp: new Date().toISOString(),
    });
  }

  // Preference tracking (only if preferences consent is given)
  trackPreference(preferenceName: string, preferenceValue: any) {
    if (!this.consent?.preferences) {
      console.log('Preference tracking disabled by user consent');
      return;
    }

    // Store user preferences
    if (typeof window !== 'undefined') {
      localStorage.setItem(`preference_${preferenceName}`, JSON.stringify(preferenceValue));
    }

    // Custom preference tracking
    this.sendPreferenceEvent(preferenceName, {
      value: preferenceValue,
      timestamp: new Date().toISOString(),
    });
  }

  // Private methods for sending data
  private sendAnalyticsEvent(eventName: string, data: Record<string, any>) {
    // Send to your analytics endpoint
    console.log('Analytics event:', eventName, data);
    
    // Example: Send to your analytics API
    // fetch('/api/analytics', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ event: eventName, data }),
    // });
  }

  private sendMarketingEvent(eventName: string, data: Record<string, any>) {
    // Send to your marketing tracking endpoint
    console.log('Marketing event:', eventName, data);
    
    // Example: Send to your marketing API
    // fetch('/api/marketing', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ event: eventName, data }),
    // });
  }

  private sendPreferenceEvent(preferenceName: string, data: Record<string, any>) {
    // Send to your preference tracking endpoint
    console.log('Preference event:', preferenceName, data);
    
    // Example: Send to your preferences API
    // fetch('/api/preferences', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ preference: preferenceName, data }),
    // });
  }
}

// Export singleton instance
export const analytics = Analytics.getInstance();

// Utility functions for common tracking scenarios
export const trackPageView = (page: string, title?: string) => {
  analytics.trackPageView(page, title);
};

export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  analytics.trackEvent(eventName, parameters);
};

export const trackFormSubmission = (formName: string, formData?: Record<string, any>) => {
  analytics.trackFormSubmission(formName, formData);
};

export const trackButtonClick = (buttonName: string, buttonLocation: string) => {
  analytics.trackButtonClick(buttonName, buttonLocation);
};

export const trackContact = (method: string, details?: Record<string, any>) => {
  analytics.trackContact(method, details);
};

export const trackQuoteRequest = (quoteData?: Record<string, any>) => {
  analytics.trackQuoteRequest(quoteData);
};

export const trackMarketingEvent = (eventName: string, parameters?: Record<string, any>) => {
  analytics.trackMarketingEvent(eventName, parameters);
};

export const trackPreference = (preferenceName: string, preferenceValue: any) => {
  analytics.trackPreference(preferenceName, preferenceValue);
}; 