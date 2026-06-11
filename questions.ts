export interface QuestionOption {
  label: string;
  value: string;
}

export interface SurveyQuestion {
  id: string;
  title: string;
  options: QuestionOption[];
}

export const questions: SurveyQuestion[] = [
  {
    id: 'q1',
    title: '\u4f60\u76ee\u524d\u4f7f\u7528AI\u5de5\u5177\u7684\u9891\u7387\u662f\uff1f',
    options: [
      { label: '\u6bcf\u5929\u90fd\u7528', value: 'daily' },
      { label: '\u6bcf\u5468\u51e0\u6b21', value: 'weekly' },
      { label: '\u5076\u5c14\u4f7f\u7528', value: 'occasionally' },
      { label: '\u4ece\u672a\u4f7f\u7528', value: 'never' },
    ],
  },
  {
    id: 'q2',
    title: '\u4f60\u6700\u5e38\u4f7f\u7528AI\u5de5\u5177\u6765\u505a\u4ec0\u4e48\uff1f',
    options: [
      { label: '\u5199\u4ee3\u7801/\u7f16\u7a0b\u8f85\u52a9', value: 'coding' },
      { label: '\u6587\u6848/\u5185\u5bb9\u521b\u4f5c', value: 'writing' },
      { label: '\u6570\u636e\u5206\u6790/\u7814\u7a76', value: 'research' },
      { label: '\u56fe\u50cf/\u8bbe\u8ba1\u751f\u6210', value: 'design' },
      { label: '\u65e5\u5e38\u5bf9\u8bdd/\u95ee\u7b54', value: 'chat' },
    ],
  },
  {
    id: 'q3',
    title: '\u4f60\u8ba4\u4e3aAI\u5bf9\u4f60\u7684\u5de5\u4f5c\u6548\u7387\u63d0\u5347\u6709\u591a\u5927\uff1f',
    options: [
      { label: '\u663e\u8457\u63d0\u5347 (>50%)', value: 'significant' },
      { label: '\u6709\u4e00\u5b9a\u63d0\u5347 (20-50%)', value: 'moderate' },
      { label: '\u7565\u6709\u5e2e\u52a9 (<20%)', value: 'slight' },
      { label: '\u6ca1\u6709\u660e\u663e\u53d8\u5316', value: 'none' },
      { label: '\u53cd\u800c\u964d\u4f4e\u4e86\u6548\u7387', value: 'negative' },
    ],
  },
  {
    id: 'q4',
    title: '\u4f60\u5bf9AI\u53d1\u5c55\u6700\u62c5\u5fe7\u7684\u662f\u4ec0\u4e48\uff1f',
    options: [
      { label: '\u9690\u79c1\u548c\u6570\u636e\u5b89\u5168', value: 'privacy' },
      { label: '\u5de5\u4f5c\u88ab\u66ff\u4ee3', value: 'jobs' },
      { label: '\u4fe1\u606f\u771f\u5b9e\u6027/\u5e7b\u89c9', value: 'hallucination' },
      { label: '\u8fc7\u5ea6\u4f9d\u8d56\u6280\u672f', value: 'dependency' },
      { label: '\u6ca1\u6709\u7279\u522b\u62c5\u5fe7', value: 'none' },
    ],
  },
  {
    id: 'q5',
    title: '\u4f60\u8ba4\u4e3a\u672a\u67653\u5e74AI\u4f1a\u5982\u4f55\u6539\u53d8\u4f60\u7684\u884c\u4e1a\uff1f',
    options: [
      { label: '\u5f7b\u5e95\u98a0\u8986\uff0c\u5927\u91cf\u5c97\u4f4d\u6d88\u5931', value: 'disruptive' },
      { label: '\u6df1\u5ea6\u878d\u5408\uff0c\u5de5\u4f5c\u65b9\u5f0f\u5927\u53d8', value: 'transformative' },
      { label: '\u8f85\u52a9\u589e\u5f3a\uff0c\u6838\u5fc3\u4e0d\u53d8', value: 'augmenting' },
      { label: '\u5f71\u54cd\u6709\u9650\uff0c\u53d8\u5316\u4e0d\u5927', value: 'minimal' },
      { label: '\u4e0d\u786e\u5b9a/\u65e0\u6cd5\u9884\u6d4b', value: 'uncertain' },
    ],
  },
];
