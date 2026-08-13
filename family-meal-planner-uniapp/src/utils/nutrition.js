/**
 * 营养学计算模块
 * 参考《中国居民膳食营养素参考摄入量（2023 版）》与《中国居民膳食指南（2022）》，
 * 按轻体力活动水平取值，做了适合家庭日常配餐的简化。
 *
 * 所有菜谱的"1 份"= 1 个标准成人份（约按每日 2000 kcal 的成年人设计）。
 * 每位家庭成员按其能量需要折算成"份数系数"，全家系数之和即做菜时的总份数。
 */

const STANDARD_KCAL = 2000; // 1 标准份对应的每日能量

// 角色定义（用于界面展示与选择）
const ROLES = [
  { key: 'adultMale', label: '成年男性', needAge: false },
  { key: 'adultFemale', label: '成年女性', needAge: false },
  { key: 'senior', label: '老人（65 岁以上）', needAge: false },
  { key: 'child', label: '孩子', needAge: true }
];

/**
 * 每日营养目标：能量 kcal、蛋白质 g、钙 mg、铁 mg
 */
function targetsFor(member) {
  switch (member.role) {
    case 'adultMale':
      return { kcal: 2250, protein: 65, calcium: 800, iron: 12, label: '成年男性' };
    case 'adultFemale':
      return { kcal: 1800, protein: 55, calcium: 800, iron: 20, label: '成年女性' };
    case 'senior':
      // 老年人能量略低，但蛋白质与钙的需要更高（预防肌肉衰减与骨质疏松）
      return { kcal: 1850, protein: 68, calcium: 1000, iron: 12, label: '老人' };
    case 'child': {
      const age = Number(member.age) || 6;
      if (age <= 3) return { kcal: 1100, protein: 25, calcium: 600, iron: 9, label: '幼儿 1-3 岁' };
      if (age <= 6) return { kcal: 1400, protein: 30, calcium: 800, iron: 10, label: '儿童 4-6 岁' };
      if (age <= 10) return { kcal: 1800, protein: 40, calcium: 1000, iron: 13, label: '儿童 7-10 岁' };
      if (age <= 13) return { kcal: 2100, protein: 55, calcium: 1200, iron: 16, label: '少年 11-13 岁' };
      return { kcal: 2500, protein: 70, calcium: 1000, iron: 16, label: '青少年 14-17 岁' };
    }
    default:
      return { kcal: 1800, protein: 55, calcium: 800, iron: 12, label: '成人' };
  }
}

/** 单个成员折算成标准份数系数 */
function factorFor(member) {
  return targetsFor(member).kcal / STANDARD_KCAL;
}

/** 全家汇总：总份数系数 + 每日营养总目标 */
function familySummary(members) {
  const summary = {
    factor: 0,
    kcal: 0,
    protein: 0,
    calcium: 0,
    iron: 0,
    count: members.length
  };
  members.forEach((m) => {
    const t = targetsFor(m);
    summary.factor += t.kcal / STANDARD_KCAL;
    summary.kcal += t.kcal;
    summary.protein += t.protein;
    summary.calcium += t.calcium;
    summary.iron += t.iron;
  });
  summary.factor = Math.round(summary.factor * 100) / 100;
  return summary;
}

/** 家里是否有 10 岁及以下的孩子（用于自动避开辛辣菜） */
function hasYoungChild(members) {
  return members.some((m) => m.role === 'child' && Number(m.age) <= 10);
}

/** 家里是否有 3 岁及以下幼儿（提示注意食材切小块、少盐） */
function hasToddler(members) {
  return members.some((m) => m.role === 'child' && Number(m.age) <= 3);
}

function roleLabel(member) {
  const role = ROLES.find((r) => r.key === member.role);
  if (!role) return '成员';
  if (member.role === 'child') return `孩子 ${member.age} 岁`;
  return role.label;
}

export {
  STANDARD_KCAL,
  ROLES,
  targetsFor,
  factorFor,
  familySummary,
  hasYoungChild,
  hasToddler,
  roleLabel
};
