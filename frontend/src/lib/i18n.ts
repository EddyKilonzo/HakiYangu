export type Translations = {
  nav: { home: string; chat: string; about: string; contact: string };
  hero: { badge: string; titleBefore: string; titleHighlight: string; titleAfter: string; subtitle: string; ctaChat: string; ctaLearn: string };
  marquee: { laws: string[]; rights: string[] };
  scenarios: { title: string; subtitle: string };
  howItWorks: { title: string; steps: Array<{ title: string; description: string }> };
  trust: { items: Array<{ label: string; sub: string }> };
  chat: {
    placeholder: string; send: string; clear: string; generateLetter: string;
    typing: string; contextTitle: string; quickScenarios: string;
    emptyTitle: string; emptySubtitle: string;
  };
  letter: {
    title: string; demand: string; complaint: string; generate: string;
    generating: string; copy: string; copied: string; download: string; disclaimer: string;
  };
  disclaimer: { short: string; full: string };
  footer: { tagline: string; links: string; resources: string; kenyaLaw: string; lsk: string; legalAid: string; disclaimer: string };
  about: { title: string; missionTitle: string; mission: string; how: string; howText: string; limits: string; limitsText: string };
  contact: {
    title: string; subtitle: string;
    form: { name: string; email: string; subject: string; message: string; send: string; sent: string; placeholder: string };
    info: { nairobi: string; languages: string; hours: string };
    mapTitle: string; faqTitle: string;
  };
  testimonials: {
    title: string;
    subtitle: string;
    items: Array<{ name: string; role: string; quote: string }>;
  };
};

export const translations: Record<'en' | 'sw', Translations> = {
  en: {
    nav: {
      home: 'Home',
      chat: 'Ask HakiYangu',
      about: 'About',
      contact: 'Contact',
    },
    hero: {
      badge: 'Free Legal Rights Assistant',
      titleBefore: 'Know Your ',
      titleHighlight: 'Rights',
      titleAfter: '',
      subtitle:
        'HakiYangu helps everyday Kenyans understand their legal rights under Kenyan law — in plain language, for free.',
      ctaChat: 'Ask a Question',
      ctaLearn: 'Learn More',
    },
    marquee: {
      laws: [
        'Employment Act 2007',
        'Constitution of Kenya 2010',
        'Consumer Protection Act 2012',
        'Landlord & Tenant Act Cap 301',
        'Traffic Act Cap 403',
        'Children Act 2022',
        'Land Act 2012',
        'Penal Code Cap 63',
        'Business Registration Act 2015',
      ],
      rights: [
        'Right to Fair Labour Practices',
        'Right to Housing',
        'Right to Consumer Protection',
        'Right to a Fair Trial',
        'Right to Education',
        'Freedom from Discrimination',
        'Right to Privacy',
        'Right to Access to Justice',
      ],
    },
    scenarios: {
      title: 'Common Legal Situations',
      subtitle: 'Select a situation to get instant rights information',
    },
    howItWorks: {
      title: 'How It Works',
      steps: [
        {
          title: 'Describe Your Situation',
          description: 'Tell HakiYangu what is happening in plain language.',
        },
        {
          title: 'Get Your Rights Explained',
          description: 'Receive clear explanations citing specific Kenyan laws.',
        },
        {
          title: 'Take Confident Action',
          description: 'Know exactly what to do next and when to seek a lawyer.',
        },
      ],
    },
    trust: {
      items: [
        { label: 'Powered by Kenyan Law', sub: 'References actual Acts and sections' },
        { label: 'Available in Swahili', sub: 'Full support for both languages' },
        { label: 'Free to Use', sub: 'No fees, no registration required' },
        { label: 'Not Legal Advice', sub: 'Information only — consult an advocate for complex matters' },
      ],
    },
    chat: {
      placeholder: 'Describe your situation...',
      send: 'Send',
      clear: 'Clear Chat',
      generateLetter: 'Generate Formal Letter',
      typing: 'HakiYangu is thinking...',
      contextTitle: 'Legal Area',
      quickScenarios: 'Quick scenarios',
      emptyTitle: 'Ask HakiYangu',
      emptySubtitle: 'Describe your legal situation and get clear information about your rights under Kenyan law.',
    },
    letter: {
      title: 'Generate Formal Letter',
      demand: 'Demand Letter',
      complaint: 'Complaint Letter',
      generate: 'Generate Letter',
      generating: 'Generating...',
      copy: 'Copy to Clipboard',
      copied: 'Copied!',
      download: 'Download as Text',
      disclaimer:
        'This letter is a template. Review it carefully and consider having a qualified advocate review it before sending.',
    },
    disclaimer: {
      short: 'Legal information only — not legal advice. Consult a qualified Kenyan advocate for complex matters.',
      full: 'HakiYangu provides legal information, not legal advice. For complex matters, consult a qualified Kenyan advocate.',
    },
    footer: {
      tagline: 'Legal rights information for every Kenyan.',
      links: 'Quick Links',
      resources: 'Legal Resources',
      kenyaLaw: 'Kenya Law (kenyalaw.org)',
      lsk: 'Law Society of Kenya',
      legalAid: 'Legal Aid Centre of Nairobi',
      disclaimer:
        'HakiYangu provides legal information, not legal advice. For complex matters, consult a qualified Kenyan advocate.',
    },
    about: {
      title: 'About HakiYangu',
      missionTitle: 'Our Mission',
      mission:
        'HakiYangu ("My Rights" in Swahili) was built to bridge the gap between Kenyans and the legal system. Many people do not know their rights and cannot afford a lawyer for every question.',
      how: 'How It Works',
      howText:
        'HakiYangu is powered by Claude AI, trained to reference specific Kenyan laws including the Constitution of Kenya 2010, the Employment Act 2007, the Consumer Protection Act 2012, and many more.',
      limits: 'Limitations',
      limitsText:
        'HakiYangu provides legal information, not legal advice. It cannot represent you in court, cannot review specific documents, and may not be current with the latest legal developments. Always consult a qualified advocate for serious matters.',
    },
    contact: {
      title: 'Get In Touch',
      subtitle: 'Have a question about HakiYangu, or want to partner with us? We\'d love to hear from you.',
      form: {
        name: 'Your Name',
        email: 'Email Address',
        subject: 'Subject',
        message: 'Your Message',
        send: 'Send Message',
        sent: 'Message Sent!',
        placeholder: 'How can we help you?',
      },
      info: {
        nairobi: 'Based in Nairobi, Kenya',
        languages: 'Available in English & Swahili',
        hours: 'Available 24/7',
      },
      mapTitle: 'We Serve All of Kenya',
      faqTitle: 'Frequently Asked Questions',
    },
    testimonials: {
      title: 'What Kenyans Are Saying',
      subtitle: 'Real people who found their rights',
      items: [
        {
          name: 'Sarah M.',
          role: 'Nairobi Tenant',
          quote: 'My landlord threatened to change the locks without notice. HakiYangu told me exactly what the Landlord & Tenant Act says — I had rights I never knew about.',
        },
        {
          name: 'James O.',
          role: 'Dismissed Employee',
          quote: 'I was fired without severance. HakiYangu explained the Employment Act 2007 and I got what I was owed. I never would have known without this tool.',
        },
        {
          name: 'Amina K.',
          role: 'Consumer, Mombasa',
          quote: 'A shop refused to refund a defective product. HakiYangu showed me my rights under the Consumer Protection Act 2012. The refund came within a week.',
        },
        {
          name: 'Peter N.',
          role: 'Road Accident Victim',
          quote: 'After a matatu accident, I had no idea how to claim compensation. HakiYangu guided me step by step through the process. It gave me confidence to act.',
        },
        {
          name: 'Grace W.',
          role: 'Small Business Owner',
          quote: 'A supplier breached our contract. HakiYangu explained my legal options and helped me draft a demand letter. Settled out of court in three weeks.',
        },
      ],
    },
  },
  sw: {
    nav: {
      home: 'Nyumbani',
      chat: 'Uliza HakiYangu',
      about: 'Kuhusu',
      contact: 'Wasiliana',
    },
    hero: {
      badge: 'Msaidizi wa Haki za Kisheria Bure',
      titleBefore: 'Jua ',
      titleHighlight: 'Haki',
      titleAfter: ' Zako',
      subtitle:
        'HakiYangu husaidia Wakenya wa kawaida kuelewa haki zao za kisheria chini ya sheria ya Kenya — kwa lugha rahisi, bila malipo.',
      ctaChat: 'Uliza Swali',
      ctaLearn: 'Jifunza Zaidi',
    },
    marquee: {
      laws: [
        'Sheria ya Ajira 2007',
        'Katiba ya Kenya 2010',
        'Sheria ya Ulinzi wa Watumiaji 2012',
        'Sheria ya Mmiliki na Mpangaji',
        'Sheria ya Usalama Barabarani',
        'Sheria ya Watoto 2022',
        'Sheria ya Ardhi 2012',
        'Kanuni ya Adhabu',
        'Sheria ya Usajili wa Biashara 2015',
      ],
      rights: [
        'Haki ya Mazoea ya Haki ya Kazi',
        'Haki ya Makazi',
        'Haki ya Ulinzi wa Watumiaji',
        'Haki ya Kesi ya Haki',
        'Haki ya Elimu',
        'Uhuru kutoka Ubaguzi',
        'Haki ya Faragha',
        'Haki ya Kupata Haki',
      ],
    },
    scenarios: {
      title: 'Hali za Kawaida za Kisheria',
      subtitle: 'Chagua hali ili kupata taarifa za haraka za haki',
    },
    howItWorks: {
      title: 'Inavyofanya Kazi',
      steps: [
        {
          title: 'Eleza Hali Yako',
          description: 'Mwambie HakiYangu kinachoendelea kwa lugha rahisi.',
        },
        {
          title: 'Pata Maelezo ya Haki Zako',
          description: 'Pokea maelezo wazi yanayotaja sheria maalum za Kenya.',
        },
        {
          title: 'Chukua Hatua kwa Ujasiri',
          description: 'Jua hasa kufanya nini baadaye na wakati wa kutafuta mwanasheria.',
        },
      ],
    },
    trust: {
      items: [
        { label: 'Inayoendeshwa na Sheria ya Kenya', sub: 'Inarejelea Sheria na vifungu halisi' },
        { label: 'Inapatikana kwa Kiswahili', sub: 'Msaada kamili kwa lugha zote mbili' },
        { label: 'Bure Kutumia', sub: 'Hakuna ada, hakuna usajili unaohitajika' },
        { label: 'Si Ushauri wa Kisheria', sub: 'Taarifa tu — wasiliana na wakili kwa mambo magumu' },
      ],
    },
    chat: {
      placeholder: 'Eleza hali yako...',
      send: 'Tuma',
      clear: 'Futa Mazungumzo',
      generateLetter: 'Tengeneza Barua Rasmi',
      typing: 'HakiYangu inafikiria...',
      contextTitle: 'Eneo la Kisheria',
      quickScenarios: 'Hali za haraka',
      emptyTitle: 'Uliza HakiYangu',
      emptySubtitle: 'Eleza hali yako ya kisheria na upate taarifa wazi kuhusu haki zako chini ya sheria ya Kenya.',
    },
    letter: {
      title: 'Tengeneza Barua Rasmi',
      demand: 'Barua ya Madai',
      complaint: 'Barua ya Malalamiko',
      generate: 'Tengeneza Barua',
      generating: 'Inatengeneza...',
      copy: 'Nakili kwenye Ubao wa Kunakili',
      copied: 'Imenakiliwa!',
      download: 'Pakua kama Maandishi',
      disclaimer:
        'Barua hii ni kiolezo. Iangalie kwa makini na fikiria kuwa na wakili aliyehitimu kuiangalia kabla ya kutuma.',
    },
    disclaimer: {
      short: 'Taarifa za kisheria tu — si ushauri wa kisheria. Wasiliana na wakili wa Kenya aliyehitimu kwa mambo magumu.',
      full: 'HakiYangu hutoa taarifa za kisheria, si ushauri wa kisheria. Kwa mambo magumu, wasiliana na wakili wa Kenya aliyehitimu.',
    },
    footer: {
      tagline: 'Taarifa za haki za kisheria kwa kila Mkenya.',
      links: 'Viungo vya Haraka',
      resources: 'Rasilimali za Kisheria',
      kenyaLaw: 'Sheria ya Kenya (kenyalaw.org)',
      lsk: 'Chama cha Wanasheria wa Kenya',
      legalAid: 'Kituo cha Msaada wa Kisheria cha Nairobi',
      disclaimer:
        'HakiYangu hutoa taarifa za kisheria, si ushauri wa kisheria. Kwa mambo magumu, wasiliana na wakili wa Kenya aliyehitimu.',
    },
    about: {
      title: 'Kuhusu HakiYangu',
      missionTitle: 'Dhamira Yetu',
      mission:
        'HakiYangu ("Haki Zangu" kwa Kiswahili) iliundwa kuziba pengo kati ya Wakenya na mfumo wa kisheria. Watu wengi hawajui haki zao na hawawezi kumudu mwanasheria kwa kila swali.',
      how: 'Inavyofanya Kazi',
      howText:
        'HakiYangu inafanywa kazi na Claude AI, iliyofunzwa kurejelea sheria maalum za Kenya ikiwa ni pamoja na Katiba ya Kenya 2010, Sheria ya Ajira 2007, Sheria ya Ulinzi wa Watumiaji 2012, na nyingine nyingi.',
      limits: 'Mipaka',
      limitsText:
        'HakiYangu hutoa taarifa za kisheria, si ushauri wa kisheria. Haiwezi kukuwakilisha mahakamani, haiwezi kupitia hati maalum, na inaweza isikuwe ya sasa na maendeleo ya kisheria ya hivi karibuni. Daima wasiliana na wakili aliyehitimu kwa mambo mazito.',
    },
    contact: {
      title: 'Wasiliana Nasi',
      subtitle: 'Una swali kuhusu HakiYangu, au unataka kushirikiana nasi? Tungependa kusikia kutoka kwako.',
      form: {
        name: 'Jina Lako',
        email: 'Anwani ya Barua Pepe',
        subject: 'Mada',
        message: 'Ujumbe Wako',
        send: 'Tuma Ujumbe',
        sent: 'Ujumbe Umetumwa!',
        placeholder: 'Tunaweza kukusaidiaje?',
      },
      info: {
        nairobi: 'Iko Nairobi, Kenya',
        languages: 'Inapatikana kwa Kiingereza na Kiswahili',
        hours: 'Inapatikana Masaa 24/7',
      },
      mapTitle: 'Tunahudumia Kenya Yote',
      faqTitle: 'Maswali Yanayoulizwa Mara Kwa Mara',
    },
    testimonials: {
      title: 'Wakenya Wanasema Nini',
      subtitle: 'Watu halisi waliogundua haki zao',
      items: [
        {
          name: 'Sarah M.',
          role: 'Mpangaji, Nairobi',
          quote: 'Mwenye nyumba alitaka kubadilisha kufuli bila notisi. HakiYangu aliniambia haki zangu chini ya Sheria ya Mmiliki na Mpangaji. Nilikuwa na haki ambazo sikujua.',
        },
        {
          name: 'James O.',
          role: 'Mfanyakazi Aliyefutwa',
          quote: 'Nilifutwa kazi bila fidia. HakiYangu alieleza Sheria ya Ajira 2007 na nikapata kilichonistahili. Nisingewahi kujua bila chombo hiki.',
        },
        {
          name: 'Amina K.',
          role: 'Mtumiaji, Mombasa',
          quote: 'Duka lilikataa kurudisha bidhaa yenye kasoro. HakiYangu alinionyesha haki zangu chini ya Sheria ya Ulinzi wa Watumiaji. Fedha zilirudishwa ndani ya wiki.',
        },
        {
          name: 'Peter N.',
          role: 'Mwathiriwa wa Ajali',
          quote: 'Baada ya ajali ya matatu, sikujua jinsi ya kudai fidia. HakiYangu aliniongoza hatua kwa hatua. Alinipatia ujasiri wa kutenda.',
        },
        {
          name: 'Grace W.',
          role: 'Mwenye Biashara',
          quote: 'Muuzaji alikiuka mkataba wetu. HakiYangu alieleza chaguzi zangu za kisheria na kunisaidia kuandika barua ya madai. Tulitatua nje ya mahakama kwa wiki tatu.',
        },
      ],
    },
  },
};

export type TranslationKey = keyof Translations;
