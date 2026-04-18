// Aegis v3 — 15 tiered simulations
// 5 EASY (obvious once you look), 5 MEDIUM (subtler), 5 HARD (nearly real)
// Rule: briefings NEVER hint at what the scam is. UI looks convincing.
// Difficulty stored so ChallengesPage can render tier badges.

export const SIMULATIONS = [

  // ══════════════════════════════════════════════════════════════════════════
  // TIER 1 — EASY (ids 1-5)
  // These have one or two clear signals if you look carefully.
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 1,
    difficulty: 'easy',
    category: 'Dark Pattern',
    emoji: '🛒',
    title: 'VitalShop Checkout',
    briefing: "You found a vitamin supplement you want to buy. Complete the checkout.",
    type: 'checkout',
    config: {
      storeName: 'VitalShop',
      storeTagline: 'Trusted Wellness Since 2008',
      item: 'Premium Omega-3 Fish Oil (90 caps)',
      itemPrice: '$24.99',
      shipping: 'FREE',
      tax: '$2.06',
      total: '$27.05',
      subscriptionLabel: 'By completing your purchase you agree to our Terms of Service and automatically enroll in the VitalCare+ Membership Program ($89/month, recurring, cancel anytime in writing within 30 days).',
      buttonText: 'Place Order',
      hiddenSubscription: true,
    },
    correctAction: 'unchecked',
    explanation: 'A pre-checked subscription box was buried in gray text beneath the order total. The $89/month charge would start automatically. Always scroll past the total before hitting buy.',
    redFlags: [
      'Pre-checked box hidden below the total in tiny gray text',
      'Auto-renewing membership for $89/month buried in legalese',
      '"Cancel anytime in writing within 30 days" is designed to make canceling hard',
    ],
  },

  {
    id: 2,
    difficulty: 'easy',
    category: 'Phishing Email',
    emoji: '📧',
    title: 'Amazon Security Alert',
    briefing: "You received this email while checking your inbox. Read it and decide what to do.",
    type: 'email',
    config: {
      senderName: 'Amazon Security',
      senderAddress: 'security-alert@amazon-accounts-verify.net',
      subject: 'Action Required: Unusual sign-in detected on your account',
      timestamp: '10:17 AM',
      body: [
        'Hello Amazon Customer,',
        'We detected an unauthorized sign-in attempt on your Amazon account from a new device in Romania.',
        'Your account has been temporarily limited. You must verify your identity within 24 hours or your account will be permanently closed.',
        'All pending orders will be cancelled and your Prime membership will be terminated if you do not act immediately.',
      ],
      buttonText: 'Verify My Account',
      buttonUrl: 'amazon-accounts-verify.net/secure/login',
    },
    correctAction: 'report',
    explanation: 'Amazon only ever emails from @amazon.com. The sender domain "amazon-accounts-verify.net" is a scammer-owned look-alike. The 24-hour threat and permanent closure language are pressure tactics. Never click links in emails about account problems - go directly to amazon.com yourself.',
    redFlags: [
      'Sender domain: amazon-accounts-verify.net, not @amazon.com',
      '"24 hours" deadline creates panic and stops careful thinking',
      'Threatening permanent account closure is a fear tactic',
      'Button URL goes to a fake site, not amazon.com',
    ],
  },

  {
    id: 3,
    difficulty: 'easy',
    category: 'Tech Support Scam',
    emoji: '💻',
    title: 'Windows Virus Warning',
    briefing: "You were reading an article online when this appeared and took over your screen.",
    type: 'popup',
    config: {
      title: 'MICROSOFT SECURITY ALERT',
      subtitle: 'Your computer has been LOCKED',
      body: 'Suspicious activity has been detected on your PC. Your files, passwords, and financial information may have been compromised. Do NOT turn off your computer.',
      phoneNumber: '1-888-234-7701',
      phoneLabel: 'Call Microsoft Support Now',
      urlBar: 'https://secure-mswindows-alert.com/notification',
    },
    correctAction: 'close',
    explanation: 'Microsoft, Apple, and Google never display phone numbers in browser alerts. This is a fake warning designed to make you call a scammer who will charge hundreds of dollars for fake repairs or install malware by asking for remote access. Force-close the browser tab and never call the number.',
    redFlags: [
      'Real OS security software never shows a phone number to call',
      '"Do NOT turn off" keeps you in a panic state, unable to think',
      'Full-screen red design is engineered to overwhelm',
      'The URL bar shows a made-up domain, not microsoft.com',
    ],
  },

  {
    id: 4,
    difficulty: 'easy',
    category: 'Government Impersonation',
    emoji: '📱',
    title: 'Social Security Notice',
    briefing: "You received this text message this morning.",
    type: 'sms',
    config: {
      sender: 'SSA-Gov-Alerts',
      messages: [
        { from: 'them', text: 'URGENT: Your Social Security Number has been suspended due to suspicious activity linked to a federal investigation. To prevent arrest, call 1-800-555-0197 before 5:00 PM today.' },
      ],
    },
    correctAction: 'delete',
    explanation: 'The Social Security Administration does not suspend Social Security Numbers, and never contacts people by text with threats or deadlines. This is a government impersonation scam. Delete the message and do not call the number.',
    redFlags: [
      'SSA never contacts you by text message - they send official letters',
      '"Prevent arrest" is designed to cause immediate fear',
      '"Before 5:00 PM" creates a fake urgency deadline',
      'Real federal agencies give you time to respond and verify through official channels',
    ],
  },

  {
    id: 5,
    difficulty: 'easy',
    category: 'Prize Scam',
    emoji: '🏆',
    title: 'Walmart Reward Pop-Up',
    briefing: "This pop-up appeared while you were browsing Facebook. You have been selected.",
    type: 'prize',
    config: {
      title: 'Congratulations! You have been selected!',
      subtitle: 'As a loyal Facebook user, you qualify for a $500 Walmart Gift Card',
      logo: 'Walmart',
      urgency: '2 prizes left! Offer expires in 08:47',
      formFields: ['Full Name', 'Date of Birth', 'Home Address', 'Credit Card (for $1.99 shipping fee)'],
      claimButtonText: 'Claim My $500 Reward Now',
    },
    correctAction: 'close',
    explanation: 'You cannot win a prize from a contest you never entered. The "$1.99 shipping fee" is how scammers steal your credit card number. The form also requests your date of birth and address for identity theft purposes. Walmart does not run pop-up giveaways like this.',
    redFlags: [
      'You never entered a Walmart contest',
      'Countdown timer is a fake urgency tactic',
      '"$1.99 shipping" is the real goal - getting your card number',
      'Collecting DOB and home address enables identity theft',
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // TIER 2 — MEDIUM (ids 6-10)
  // Looks mostly legitimate; one or two hidden tells require attention.
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 6,
    difficulty: 'medium',
    category: 'Phishing',
    emoji: '🔐',
    title: 'Chase Bank Login',
    briefing: "You clicked a link in an email and landed on this page. It is asking you to sign in.",
    type: 'login',
    config: {
      bankName: 'Chase',
      fakeUrl: 'chase-securebanking.com/login/verify',
      realUrl: 'chase.com',
      logoColor: 'bg-blue-700',
      logoText: 'CHASE',
      subText: 'Online Banking - Sign In',
      inputLabels: ['Username or Email', 'Password'],
      footerNote: 'Secure 256-bit encrypted connection',
    },
    correctAction: 'leave',
    explanation: 'The URL bar says "chase-securebanking.com" not "chase.com". Scammers register look-alike domains with extra words like "secure" or "banking" to seem legitimate. The page design can be an exact clone of the real site. Always check the domain name before entering any password.',
    redFlags: [
      'URL: chase-securebanking.com, not chase.com',
      'Extra words in the domain ("securebanking") signal a fake',
      'You arrived here from an email link, not by navigating directly',
      'Real banks will never ask you to verify login by email link',
    ],
  },

  {
    id: 7,
    difficulty: 'medium',
    category: 'Smishing',
    emoji: '📦',
    title: 'FedEx Delivery Update',
    briefing: "You are expecting a package. This text arrived this afternoon.",
    type: 'sms',
    config: {
      sender: 'FedEx-Delivery',
      messages: [
        { from: 'them', text: 'FedEx: Your package #HD94827 could not be delivered. Address confirmation required. Update delivery info to reschedule: fedex-delivery-confirm.com/update' },
      ],
    },
    correctAction: 'delete',
    explanation: 'FedEx texts only use short codes or official numbers and always link to fedex.com. The domain "fedex-delivery-confirm.com" is a fake site that will steal your personal info or install malware. If you are expecting a package, go directly to fedex.com and enter the tracking number yourself.',
    redFlags: [
      'Link goes to fedex-delivery-confirm.com, not fedex.com',
      'FedEx never texts with a web link to confirm your address',
      'Tracking number format is unusual and unverifiable without visiting the real site',
      'Smishing texts often arrive when you actually are expecting a delivery - that is no coincidence',
    ],
  },

  {
    id: 8,
    difficulty: 'medium',
    category: 'Romance Scam',
    emoji: '💌',
    title: 'The Overseas Emergency',
    briefing: "You have been chatting with someone named Robert on Facebook for the past few weeks. Today he sends you these messages.",
    type: 'dm',
    config: {
      platform: 'Facebook Messenger',
      contactName: 'Robert Harrington',
      contactSubtitle: 'Active 3 minutes ago',
      avatar: 'RH',
      avatarColor: 'bg-blue-600',
      messages: [
        { from: 'them', text: 'Good morning! I hope you slept well. I have been thinking of you.' },
        { from: 'them', text: 'I have some terrible news. I was robbed at my hotel here in London. My wallet, phone, and passport were stolen.' },
        { from: 'them', text: 'The oil rig company cannot wire money until Monday and I need $750 for a replacement passport to fly home.' },
        { from: 'them', text: 'You are the only person I trust. Could you wire it through Western Union? I will pay you back the moment I land. I promise.' },
      ],
      replyOptions: [
        { id: 'send', label: 'Send the $750 via Western Union', danger: true },
        { id: 'half', label: 'Send $400 to help him out', danger: true },
        { id: 'block', label: "Do not send money - this feels wrong", danger: false },
        { id: 'videocall', label: 'Ask to video call first', danger: false },
      ],
    },
    correctAction: 'block',
    explanation: 'This is a classic romance scam. Scammers build emotional connections over weeks then invent an overseas emergency requiring immediate wire transfer. The "oil rig worker stranded abroad" is one of the most documented romance scam scripts. Wire transfers cannot be reversed. Never send money to someone you have not met in person.',
    redFlags: [
      '"Oil rig worker" abroad is a textbook romance scam pattern',
      'Stolen passport and wallet - scripted emergency',
      'Western Union wire transfers cannot be reversed once sent',
      'Scammers never agree to video calls because they use stolen photos',
    ],
  },

  {
    id: 9,
    difficulty: 'medium',
    category: 'Gift Card Scam',
    emoji: '📞',
    title: 'IRS Back Taxes Call',
    briefing: "Your phone rings from an unknown number. The caller ID displays: IRS - Washington DC.",
    type: 'phone',
    config: {
      callerId: 'IRS - Washington DC',
      callerNumber: '+1 (202) 555-0147',
      transcript: [
        { from: 'caller', text: 'Good afternoon. This is Agent Williams from the Internal Revenue Service Criminal Investigation Division.' },
        { from: 'caller', text: 'We have issued a federal warrant for your arrest due to $4,100 in unpaid taxes from the years 2020 through 2022.' },
        { from: 'caller', text: 'To resolve this today and avoid being taken into custody, you can pay using Google Play or iTunes gift cards.' },
        { from: 'caller', text: 'Purchase the cards, then call us back with the redemption codes to clear your account immediately.' },
      ],
      actions: [
        { id: 'pay', label: 'Buy the gift cards to clear my record', danger: true },
        { id: 'info', label: 'Ask for my case number and more details', danger: true },
        { id: 'hangup', label: 'Hang up - the IRS does not work this way', danger: false },
      ],
    },
    correctAction: 'hangup',
    explanation: 'The IRS never calls demanding same-day payment, never threatens immediate arrest, and never accepts gift cards as payment. Caller ID showing "IRS" is easily faked. Real IRS contact always starts with a mailed notice. If you owe taxes, verify by calling 1-800-829-1040 directly.',
    redFlags: [
      'IRS always contacts you by official mail first - never an unexpected phone call',
      'No legitimate government agency accepts gift cards as payment - ever',
      'Caller ID can be spoofed by anyone with $10 software',
      '"Arrest today" language is designed to stop you from thinking rationally',
    ],
  },

  {
    id: 10,
    difficulty: 'medium',
    category: 'Grandparent Scam',
    emoji: '👴',
    title: 'Grandson in Trouble',
    briefing: "You receive these texts from an unknown number this evening.",
    type: 'sms',
    config: {
      sender: 'Unknown +1 (512) 555-0183',
      messages: [
        { from: 'them', text: "Grandma it's me Tyler. I got a new phone number please save it. Please don't tell Mom and Dad yet." },
        { from: 'them', text: "I got in an accident and I'm at the police station in Austin. Nobody got hurt but they need $1,400 bail or I stay here all weekend." },
        { from: 'them', text: "Please can you buy Amazon gift cards? 3 cards at $500 each. Text me the codes. I will explain everything when I am home I love you so much." },
      ],
    },
    correctAction: 'delete',
    explanation: 'This is the grandparent scam. The scammer pretends to be a grandchild using a "new number" so you cannot verify it is really them. Courts and police never accept gift cards for bail. Before doing anything, hang up and call your grandchild directly on the number you already have saved.',
    redFlags: [
      '"New number" so you cannot verify it is really your grandchild',
      '"Do not tell Mom and Dad" prevents you from verifying with family',
      'Police and courts only accept official bail payments, never gift cards',
      'Emotional urgency ("I love you") is used to prevent rational thinking',
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // TIER 3 — HARD (ids 11-15)
  // Nearly indistinguishable from real. Realistic domains, professional copy.
  // No obvious urgency. Requires careful inspection.
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 11,
    difficulty: 'hard',
    category: 'Phishing',
    emoji: '🏦',
    title: 'PayPal Account Notification',
    briefing: "You received this email. You do have a PayPal account.",
    type: 'email',
    config: {
      senderName: 'PayPal',
      senderAddress: 'service@paypal-notifications.com',
      subject: 'We noticed a recent change to your account',
      timestamp: '2:34 PM',
      body: [
        'Hi there,',
        'We recently detected a new billing address was added to your PayPal account.',
        'If this was you, no action is needed.',
        'If you did not make this change, please review your account activity and update your password.',
      ],
      buttonText: 'Review My Account',
      buttonUrl: 'paypal-notifications.com/account/review',
      hasFooter: true,
      footerText: 'PayPal Inc. | 2211 North First Street | San Jose, CA 95131',
    },
    correctAction: 'report',
    explanation: 'PayPal only sends emails from @paypal.com addresses. The domain "paypal-notifications.com" is a registered fake. The calm, non-threatening tone ("no action needed if this was you") is intentional - it lowers your guard. The realistic footer address and professional format are copied from real PayPal emails. Always check the sender domain carefully.',
    redFlags: [
      'Sender: paypal-notifications.com, not @paypal.com',
      'Calm tone designed to lower your guard - unlike most obvious scam emails',
      'Button URL goes to paypal-notifications.com, not paypal.com',
      'Footer with real PayPal address is copied from legitimate emails to add authenticity',
    ],
  },

  {
    id: 12,
    difficulty: 'hard',
    category: 'Smishing',
    emoji: '💳',
    title: 'Bank Fraud Alert',
    briefing: "You received this text message. You are a Wells Fargo customer.",
    type: 'sms',
    config: {
      sender: 'WF-Alerts',
      messages: [
        { from: 'them', text: 'Wells Fargo: We blocked a suspicious $847.00 charge at TARGET on your card ending 4821. Did you make this purchase? Reply YES to approve or NO to dispute.' },
      ],
    },
    correctAction: 'delete',
    explanation: 'This looks convincing because it uses a real merchant name, a plausible transaction amount, and the last four digits of a card number scammers can guess or have from a data breach. Real bank fraud alerts do exist, but they ask you to call the number on the back of your card or log in directly - never to reply by text. Replying YES or NO confirms your number is active and may trigger more fraud.',
    redFlags: [
      'Real bank fraud alerts ask you to call the number on your card, not reply by text',
      'Replying YES or NO confirms your number is active to the scammer',
      'Card numbers and merchants can come from data breaches - this does not mean the text is real',
      'When in doubt, call the number printed on the back of your card directly',
    ],
  },

  {
    id: 13,
    difficulty: 'hard',
    category: 'Medicare Fraud',
    emoji: '🏥',
    title: 'Free Medical Device',
    briefing: "Your phone rings. The caller says they are from the Medicare Benefits Center.",
    type: 'phone',
    config: {
      callerId: 'Medicare Benefits',
      callerNumber: '+1 (800) 555-0281',
      transcript: [
        { from: 'caller', text: 'Hello, this is a courtesy call from the Medicare Benefits Center.' },
        { from: 'caller', text: 'Our records show you qualify for a no-cost continuous glucose monitor - a $900 device - covered fully under your Medicare Part B benefits.' },
        { from: 'caller', text: 'To process your device, we need to update your file with your Medicare ID number and date of birth for verification.' },
        { from: 'caller', text: 'This offer is part of a limited enrollment window. Would you like to proceed and receive your free device?' },
      ],
      actions: [
        { id: 'giveinfo', label: 'Give my Medicare ID to claim the free device', danger: true },
        { id: 'askmore', label: 'Ask what the device is used for first', danger: true },
        { id: 'hangup', label: 'Hang up - Medicare already has my information', danger: false },
      ],
    },
    correctAction: 'hangup',
    explanation: 'Medicare already has your Medicare ID and date of birth. They never call to "verify" or "update" information they already have. Giving your Medicare number enables fraudsters to bill Medicare for expensive equipment in your name, potentially exhausting your benefits. The professional, helpful tone is intentional to seem trustworthy.',
    redFlags: [
      'Medicare already has your Medicare ID - they never call to ask for it',
      'Unsolicited free device offers by phone are nearly always fraud',
      '"Update your file" - Medicare does not need to update what they already know',
      'Professional polite tone is intentional - hard scams do not sound like hard scams',
    ],
  },

  {
    id: 14,
    difficulty: 'hard',
    category: 'Account Takeover',
    emoji: '🔑',
    title: 'Apple ID Verification',
    briefing: "You received this email. You own an iPhone and use iCloud.",
    type: 'email',
    config: {
      senderName: 'Apple',
      senderAddress: 'no-reply@apple-id-accounts.com',
      subject: 'Your Apple ID was used to sign in on a new iPhone',
      timestamp: '8:52 AM',
      body: [
        'Your Apple ID was used to sign in to iCloud via a new iPhone 15 in Chicago, IL.',
        'Date: Today at 7:44 AM CDT',
        'If this sign-in was you, you can ignore this email.',
        'If you did not sign in, your account may be at risk. We recommend changing your Apple ID password to secure your device and data.',
      ],
      buttonText: 'Review Sign-In Activity',
      buttonUrl: 'apple-id-accounts.com/account/signin-activity',
      hasFooter: true,
      footerText: 'Apple Inc. | One Apple Park Way | Cupertino, CA 95014',
    },
    correctAction: 'report',
    explanation: 'Apple only sends emails from @apple.com or @email.apple.com. The domain "apple-id-accounts.com" is a scammer-registered fake. The email format - including the city, device type, time, and real Apple headquarters address in the footer - is a near-perfect copy of legitimate Apple security emails. The soft language ("if this was you, ignore this") is designed to seem non-threatening so you click casually.',
    redFlags: [
      'Sender: apple-id-accounts.com, not @apple.com or @email.apple.com',
      'The footer with Apple\'s real address is copied from real emails - it proves nothing',
      'Soft, non-threatening language is designed so you click without suspecting anything',
      'URL goes to apple-id-accounts.com, not appleid.apple.com',
    ],
  },

  {
    id: 15,
    difficulty: 'hard',
    category: 'Investment Fraud',
    emoji: '📈',
    title: 'Cryptocurrency Investment Platform',
    briefing: "A friend you know from church told you about this investment platform. You visited their website and are considering signing up.",
    type: 'login',
    config: {
      bankName: 'CryptoYield Pro',
      fakeUrl: 'cryptoyieldpro.io/signup',
      realUrl: 'n/a',
      logoColor: 'bg-emerald-600',
      logoText: 'CYP',
      subText: 'Guaranteed 12-18% Monthly Returns',
      inputLabels: ['Full Name', 'Email Address', 'Initial Investment ($)'],
      footerNote: 'Licensed in Panama. Regulated by International Financial Authority.',
      showCreateAccount: true,
    },
    correctAction: 'leave',
    explanation: 'No legitimate investment can "guarantee" 12-18% monthly returns - that would be 144-216% per year, which is impossible. This is a classic Ponzi scheme structure. The "licensed in Panama" claim and vague "International Financial Authority" are unverifiable. When someone from your community promotes an investment opportunity, scammers specifically target trusted social networks. In the US, any investment advisor must be registered with FINRA or the SEC.',
    redFlags: [
      '"Guaranteed returns" of any kind is illegal for licensed investments and impossible in practice',
      '"Licensed in Panama" with a vague authority name is unverifiable',
      'Investment platforms recommended through personal networks exploit trust deliberately',
      'Verify any investment advisor at finra.org/brokercheck before giving anyone money',
    ],
  },
];
