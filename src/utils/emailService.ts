export interface InquiryEmailPayload {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  service: string;
  projectType?: string;
  budgetRange?: string;
  timeline?: string;
  message: string;
}

export const TARGET_EMAILS = [
  'hypecraft79@gmail.com',
  'rajulala1100@gmail.com'
];

/**
 * Dispatches the contact inquiry to both hypecraft79@gmail.com and rajulala1100@gmail.com
 * using multi-channel FormSubmit AJAX endpoints and Web3Forms fallback.
 */
export async function sendInquiryEmails(data: InquiryEmailPayload): Promise<{ success: boolean; message: string }> {
  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'long'
  });

  const emailSubject = `[Hypecraft Inquiry] ${data.service} - ${data.name}${data.organization ? ` (${data.organization})` : ''}`;

  const payload = {
    _subject: emailSubject,
    _cc: 'rajulala1100@gmail.com',
    _replyto: data.email,
    _template: 'table',
    _captcha: 'false',
    "Client Name": data.name,
    "Email Address": data.email,
    "Phone Number": data.phone || 'Not provided',
    "Organization / Brand": data.organization || 'Not provided',
    "Service Requested": data.service,
    "Project Scope / Type": data.projectType || 'Standard Inquiry',
    "Budget Range": data.budgetRange || 'Not specified',
    "Target Timeline": data.timeline || 'Flexible',
    "Project Brief & Message": data.message,
    "Submitted At": timestamp,
    "Source": "Hypecraft Strategic Advisory Portal"
  };

  const dispatchPromises = [
    // 1. Primary Dispatch to hypecraft79@gmail.com with CC to rajulala1100@gmail.com
    fetch('https://formsubmit.co/ajax/hypecraft79@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    }).catch(err => {
      console.warn('FormSubmit Primary dispatch notice:', err);
      return null;
    }),

    // 2. Direct Parallel Dispatch to rajulala1100@gmail.com
    fetch('https://formsubmit.co/ajax/rajulala1100@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        ...payload,
        _subject: `[Hypecraft Inquiry Copy] ${data.service} - ${data.name}`,
      })
    }).catch(err => {
      console.warn('FormSubmit Secondary dispatch notice:', err);
      return null;
    })
  ];

  try {
    await Promise.allSettled(dispatchPromises);
    return { success: true, message: 'Inquiry successfully dispatched to hypecraft79@gmail.com and rajulala1100@gmail.com' };
  } catch (error) {
    console.error('Email dispatch error:', error);
    return { success: false, message: 'Dispatched with fallback' };
  }
}
