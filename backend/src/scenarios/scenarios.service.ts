import { Injectable } from '@nestjs/common';

export interface Scenario {
  id: string;
  icon: string;
  titleEn: string;
  titleSw: string;
  descriptionEn: string;
  descriptionSw: string;
  quickQuestionEn: string;
  quickQuestionSw: string;
  area: string;
}

@Injectable()
export class ScenariosService {
  private readonly scenarios: Scenario[] = [
    {
      id: 'landlord',
      icon: 'home',
      titleEn: 'Landlord & Tenant',
      titleSw: 'Mmiliki & Mpangaji',
      descriptionEn: 'Eviction, rent disputes, deposit deductions',
      descriptionSw: 'Kufukuzwa, migogoro ya kodi, makato ya amana',
      quickQuestionEn: 'My landlord is threatening to evict me without notice. What are my rights?',
      quickQuestionSw: 'Mmiliki wangu anatishia kunifukuza bila taarifa. Nina haki gani?',
      area: 'Landlord/Tenant',
    },
    {
      id: 'employment',
      icon: 'briefcase',
      titleEn: 'Employment Rights',
      titleSw: 'Haki za Kazi',
      descriptionEn: 'Unfair dismissal, unpaid wages, workplace rights',
      descriptionSw: 'Kufukuzwa vibaya, mishahara isiyolipwa, haki za mahali pa kazi',
      quickQuestionEn: 'I was dismissed without being given a reason. What can I do?',
      quickQuestionSw: 'Nilifukuzwa kazi bila kupewa sababu. Ninaweza kufanya nini?',
      area: 'Employment',
    },
    {
      id: 'consumer',
      icon: 'shopping-cart',
      titleEn: 'Consumer Protection',
      titleSw: 'Ulinzi wa Watumiaji',
      descriptionEn: 'Fake goods, refund rights, unfair business practices',
      descriptionSw: 'Bidhaa feki, haki za kurudishiwa pesa, desturi mbaya za biashara',
      quickQuestionEn: 'I bought a product that was defective and the seller refuses to refund me.',
      quickQuestionSw: 'Nilinunua bidhaa iliyokuwa na kasoro na muuzaji anakataa kunirudishia pesa.',
      area: 'Consumer Protection',
    },
    {
      id: 'accident',
      icon: 'car',
      titleEn: 'Traffic Accidents',
      titleSw: 'Ajali za Barabara',
      descriptionEn: 'Compensation, insurance claims, police reports',
      descriptionSw: 'Fidia, madai ya bima, ripoti za polisi',
      quickQuestionEn: 'I was involved in a road accident. How do I claim compensation?',
      quickQuestionSw: 'Nilihusika katika ajali ya barabara. Ninawezaje kudai fidia?',
      area: 'Traffic',
    },
    {
      id: 'business',
      icon: 'clipboard',
      titleEn: 'Business Registration',
      titleSw: 'Usajili wa Biashara',
      descriptionEn: 'Business registration, licenses, compliance',
      descriptionSw: 'Usajili wa biashara, leseni, uzingatifu',
      quickQuestionEn: 'How do I register my small business in Kenya?',
      quickQuestionSw: 'Ninawezaje kusajili biashara yangu ndogo Kenya?',
      area: 'Business',
    },
    {
      id: 'family',
      icon: 'users',
      titleEn: 'Family Law',
      titleSw: 'Sheria ya Familia',
      descriptionEn: 'Divorce, child custody, inheritance',
      descriptionSw: 'Talaka, ulezi wa watoto, urithi',
      quickQuestionEn: 'My spouse and I are separating. What are my rights regarding our children?',
      quickQuestionSw: 'Mimi na mwenzi wangu tunaachana. Nina haki gani kuhusu watoto wetu?',
      area: 'Family Law',
    },
  ];

  getAll(): Scenario[] {
    return this.scenarios;
  }
}
