/**
 * 菜谱数据库
 *
 * 份量约定：所有 ingredients 与 nutrition 均按【1 个标准成人份】给出
 * （标准份 = 每日 2000 kcal 的成年人在这一餐这道菜里应摄入的量）。
 * 页面展示与购物清单会按全家的份数系数自动放大。
 *
 * type: breakfast 早餐套餐 | meat 荤菜 | veg 素菜 | soup 汤 | staple 主食
 * spicy: true 表示辛辣，家中有 10 岁以下孩子时自动不选。
 * pantry: true 的食材是家庭常备调味品，购物清单单独分组、可跳过。
 * 营养单位：kcal 千卡 / protein 蛋白质 g / fat 脂肪 g / carbs 碳水 g / calcium 钙 mg / iron 铁 mg
 */

import { RECIPES as EXTRA_RECIPES } from './recipes-extra.js';

const RECIPES = [
  // ================= 早餐 =================
  {
    id: 'br01',
    name: '牛奶燕麦粥 + 水煮蛋 + 香蕉',
    type: 'breakfast',
    spicy: false,
    tags: ['高钙', '高蛋白', '快手'],
    time: 15,
    difficulty: '简单',
    ingredients: [
      { name: '即食燕麦片', amount: 50, unit: 'g', category: '米面粮油' },
      { name: '纯牛奶', amount: 250, unit: 'ml', category: '奶品豆制品' },
      { name: '鸡蛋', amount: 1, unit: '个', category: '肉禽蛋' },
      { name: '香蕉', amount: 0.5, unit: '根', category: '蔬菜水果' }
    ],
    steps: [
      '鸡蛋冷水下锅，水开后煮 7 分钟捞出过凉水，剥壳备用。',
      '小锅中倒入牛奶，小火加热至微微冒泡（不要煮沸）。',
      '倒入燕麦片搅拌，小火煮 3 分钟至浓稠。',
      '盛出燕麦粥，配水煮蛋和香蕉即可。'
    ],
    nutrition: { kcal: 480, protein: 22, fat: 15, carbs: 65, calcium: 330, iron: 2.6 },
    tip: '牛奶 + 鸡蛋提供优质蛋白和钙，燕麦的 β-葡聚糖有助控制血脂，适合全家人的基础早餐。'
  },
  {
    id: 'br02',
    name: '青菜瘦肉粥 + 水煮蛋',
    type: 'breakfast',
    spicy: false,
    tags: ['养胃', '儿童友好'],
    time: 30,
    difficulty: '简单',
    ingredients: [
      { name: '大米', amount: 45, unit: 'g', category: '米面粮油' },
      { name: '猪里脊肉', amount: 35, unit: 'g', category: '肉禽蛋' },
      { name: '上海青', amount: 60, unit: 'g', category: '蔬菜水果' },
      { name: '鸡蛋', amount: 1, unit: '个', category: '肉禽蛋' },
      { name: '姜', amount: 3, unit: 'g', category: '蔬菜水果' },
      { name: '食盐', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '大米淘洗后加 8 倍清水，大火烧开转小火煮 20 分钟至米粒开花。',
      '趁煮粥时另起小锅：鸡蛋冷水下锅，水开后煮 7 分钟捞出过凉水，剥壳备用。',
      '里脊肉切末，用少许盐和姜丝抓匀腌 5 分钟去腥入味；上海青洗净切碎。',
      '粥煮好后下肉末快速搅散，中火煮 2 分钟至完全变色。',
      '放入青菜碎再煮 1 分钟，加盐调味出锅；配水煮蛋一起吃。'
    ],
    nutrition: { kcal: 420, protein: 20, fat: 9, carbs: 62, calcium: 120, iron: 2.8 },
    tip: '粥类早餐易消化，加瘦肉和鸡蛋补足蛋白质，避免"白粥+咸菜"式的低营养早餐。'
  },
  {
    id: 'br03',
    name: '全麦吐司三明治 + 牛奶',
    type: 'breakfast',
    spicy: false,
    tags: ['高蛋白', '快手', '带出门'],
    time: 10,
    difficulty: '简单',
    ingredients: [
      { name: '全麦吐司', amount: 2, unit: '片', category: '米面粮油' },
      { name: '鸡蛋', amount: 1, unit: '个', category: '肉禽蛋' },
      { name: '奶酪片', amount: 1, unit: '片', category: '奶品豆制品' },
      { name: '生菜', amount: 30, unit: 'g', category: '蔬菜水果' },
      { name: '番茄', amount: 50, unit: 'g', category: '蔬菜水果' },
      { name: '纯牛奶', amount: 200, unit: 'ml', category: '奶品豆制品' }
    ],
    steps: [
      '平底锅少油，中小火煎鸡蛋约 2 分钟至全熟（全熟更适合孩子），盛出备用。',
      '吐司放入烤面包机或无油平底锅，烤 2 分钟至微焦定型。',
      '生菜洗净甩干水分，番茄切薄片。',
      '按吐司-生菜-番茄片-煎蛋-奶酪-吐司的顺序叠好，轻压一下对角切开。',
      '搭配一杯温牛奶即可，也可以用保鲜纸包好带出门。'
    ],
    nutrition: { kcal: 460, protein: 24, fat: 17, carbs: 52, calcium: 420, iron: 3.0 },
    tip: '奶酪 + 牛奶让这份早餐的钙接近全天需要量的一半，特别适合长身体的孩子。'
  },
  {
    id: 'br04',
    name: '鲜肉包 + 豆浆 + 拍黄瓜',
    type: 'breakfast',
    spicy: false,
    tags: ['中式', '省时'],
    time: 15,
    difficulty: '简单',
    ingredients: [
      { name: '速冻鲜肉包', amount: 2, unit: '个', category: '米面粮油' },
      { name: '豆浆（或黄豆现打）', amount: 250, unit: 'ml', category: '奶品豆制品' },
      { name: '鸡蛋', amount: 1, unit: '个', category: '肉禽蛋' },
      { name: '黄瓜', amount: 80, unit: 'g', category: '蔬菜水果' },
      { name: '香醋', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '蒸锅上汽后放入肉包蒸 12 分钟（或按包装说明）。',
      '同锅蒸格里放一个鸡蛋一起蒸熟，省一个灶眼。',
      '黄瓜拍碎切段，加香醋和少许盐拌匀。',
      '豆浆加热，全部装盘即可。'
    ],
    nutrition: { kcal: 470, protein: 21, fat: 14, carbs: 63, calcium: 150, iron: 3.2 },
    tip: '豆浆提供植物蛋白与大豆异黄酮；早餐加一份蔬菜是多数家庭最容易缺的一步。'
  },
  {
    id: 'br05',
    name: '番茄鸡蛋青菜面',
    type: 'breakfast',
    spicy: false,
    tags: ['热乎', '儿童友好'],
    time: 15,
    difficulty: '简单',
    ingredients: [
      { name: '挂面', amount: 70, unit: 'g', category: '米面粮油' },
      { name: '番茄', amount: 120, unit: 'g', category: '蔬菜水果' },
      { name: '鸡蛋', amount: 1, unit: '个', category: '肉禽蛋' },
      { name: '上海青', amount: 50, unit: 'g', category: '蔬菜水果' },
      { name: '食用油', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '食盐', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '番茄去皮切块，热锅少油炒出沙，加两碗水烧开。',
      '下挂面煮 3 分钟。',
      '淋入打散的蛋液，放青菜再煮 1 分钟。',
      '加盐调味出锅，晾到温热再给孩子吃。'
    ],
    nutrition: { kcal: 450, protein: 17, fat: 10, carbs: 72, calcium: 90, iron: 3.0 },
    tip: '番茄中的番茄红素经加热更易吸收；汤面早餐冬天暖胃，注意少放盐。'
  },
  {
    id: 'br06',
    name: '小米紫薯粥 + 牛奶蒸蛋',
    type: 'breakfast',
    spicy: false,
    tags: ['粗粮', '养胃', '适合老人'],
    time: 30,
    difficulty: '简单',
    ingredients: [
      { name: '小米', amount: 40, unit: 'g', category: '米面粮油' },
      { name: '紫薯', amount: 80, unit: 'g', category: '蔬菜水果' },
      { name: '鸡蛋', amount: 1, unit: '个', category: '肉禽蛋' },
      { name: '纯牛奶', amount: 150, unit: 'ml', category: '奶品豆制品' }
    ],
    steps: [
      '紫薯去皮切小块，与淘洗好的小米一起加水，煮 25 分钟成粥。',
      '鸡蛋打散，加入等量温牛奶和一点点盐，过筛去泡沫。',
      '蛋液盖保鲜膜扎孔，水开后中火蒸 10 分钟成牛奶蒸蛋。',
      '粥配蒸蛋一起食用。'
    ],
    nutrition: { kcal: 430, protein: 18, fat: 12, carbs: 62, calcium: 260, iron: 3.4 },
    tip: '小米和紫薯都是优质粗粮，膳食纤维丰富；牛奶蒸蛋口感嫩滑，老人孩子都容易接受。'
  },

  {
    id: 'br07',
    name: '手抓饼鸡蛋生菜卷',
    type: 'breakfast',
    spicy: false,
    tags: ['小红书爆款', '快手', '带出门'],
    time: 10,
    difficulty: '简单',
    ingredients: [
      { name: '手抓饼', amount: 1, unit: '张', category: '米面粮油', note: '冷冻的，免解冻直接煎' },
      { name: '鸡蛋', amount: 1, unit: '个', category: '肉禽蛋' },
      { name: '生菜', amount: 30, unit: 'g', category: '蔬菜水果' },
      { name: '黄瓜', amount: 30, unit: 'g', category: '蔬菜水果' },
      { name: '纯牛奶', amount: 200, unit: 'ml', category: '奶品豆制品' },
      { name: '番茄酱', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '平底锅无需放油，冷冻手抓饼直接下锅，中小火两面煎至金黄起酥。',
      '推到一边，打入鸡蛋，用饼盖住煎蛋（网红做法），煎至凝固。',
      '铺上生菜和黄瓜条，挤番茄酱，卷起来即可。',
      '配一杯牛奶，5 分钟出门不迟到。'
    ],
    nutrition: { kcal: 490, protein: 18, fat: 24, carbs: 52, calcium: 260, iron: 2.2 },
    tip: '手抓饼油脂偏高，卷入鸡蛋和蔬菜能平衡营养；一周吃 1-2 次解馋即可。'
  },
  {
    id: 'br08',
    name: '皮蛋瘦肉粥',
    type: 'breakfast',
    spicy: false,
    tags: ['经典', '养胃'],
    time: 35,
    difficulty: '简单',
    ingredients: [
      { name: '大米', amount: 45, unit: 'g', category: '米面粮油' },
      { name: '皮蛋', amount: 0.5, unit: '个', category: '肉禽蛋' },
      { name: '猪里脊肉', amount: 30, unit: 'g', category: '肉禽蛋' },
      { name: '姜', amount: 3, unit: 'g', category: '蔬菜水果' },
      { name: '小葱', amount: 3, unit: 'g', category: '蔬菜水果' },
      { name: '食盐', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '大米加几滴油拌匀腌 10 分钟（粥更绵），加 8 倍水煮开转小火 20 分钟。',
      '里脊切丝用盐和姜丝腌 5 分钟；皮蛋切丁。',
      '下肉丝搅散煮 2 分钟，再下皮蛋丁煮 3 分钟。',
      '加盐调味，撒葱花出锅。'
    ],
    nutrition: { kcal: 400, protein: 17, fat: 9, carbs: 62, calcium: 60, iron: 2.6 },
    tip: '广式经典早餐粥；皮蛋钠含量较高，幼儿建议少量尝味即可。'
  },
  {
    id: 'br09',
    name: '香蕉燕麦松饼 + 牛奶',
    type: 'breakfast',
    spicy: false,
    tags: ['小红书爆款', '无糖', '儿童友好'],
    time: 15,
    difficulty: '简单',
    ingredients: [
      { name: '香蕉', amount: 0.7, unit: '根', category: '蔬菜水果' },
      { name: '即食燕麦片', amount: 40, unit: 'g', category: '米面粮油' },
      { name: '鸡蛋', amount: 1, unit: '个', category: '肉禽蛋' },
      { name: '纯牛奶', amount: 200, unit: 'ml', category: '奶品豆制品' }
    ],
    steps: [
      '香蕉压成泥，加鸡蛋和燕麦片拌成稠糊（就这 3 样，不用加糖）。',
      '不粘锅小火，舀一勺糊摊成小圆饼。',
      '每面煎 2 分钟至金黄，全程小火防糊。',
      '配牛奶食用，可以点缀水果。'
    ],
    nutrition: { kcal: 450, protein: 19, fat: 14, carbs: 62, calcium: 290, iron: 2.4 },
    tip: '香蕉自带甜味无需加糖，燕麦提供膳食纤维，是小红书上零失败的儿童早餐爆款。'
  },
  {
    id: 'br10',
    name: '蒸红薯 + 水煮蛋 + 牛奶',
    type: 'breakfast',
    spicy: false,
    tags: ['粗粮', '零厨艺', '控糖'],
    time: 25,
    difficulty: '简单',
    ingredients: [
      { name: '红薯', amount: 150, unit: 'g', category: '蔬菜水果' },
      { name: '鸡蛋', amount: 1, unit: '个', category: '肉禽蛋' },
      { name: '纯牛奶', amount: 250, unit: 'ml', category: '奶品豆制品' }
    ],
    steps: [
      '红薯洗净切大块，和鸡蛋一起放进蒸锅。',
      '水开后中火蒸 15 分钟，鸡蛋 8 分钟时先取出过凉水。',
      '牛奶加热，全部装盘即可，零厨艺三件套。'
    ],
    nutrition: { kcal: 430, protein: 17, fat: 12, carbs: 64, calcium: 330, iron: 1.8 },
    tip: '红薯的膳食纤维和胡萝卜素远高于白米面主食；这套组合蛋白质、钙、碳水一次配齐。'
  },

  // ================= 荤菜 =================
  {
    id: 'm01',
    name: '番茄炒蛋',
    type: 'meat',
    spicy: false,
    tags: ['国民家常菜', '儿童友好', '快手'],
    time: 10,
    difficulty: '简单',
    ingredients: [
      { name: '番茄', amount: 150, unit: 'g', category: '蔬菜水果' },
      { name: '鸡蛋', amount: 1.5, unit: '个', category: '肉禽蛋' },
      { name: '小葱', amount: 5, unit: 'g', category: '蔬菜水果' },
      { name: '食用油', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '食盐', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '白糖', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '鸡蛋加几滴清水打散；番茄切滚刀块。',
      '热锅热油，倒入蛋液，凝固后划散盛出。',
      '锅内留底油，下番茄中火炒出汁水。',
      '倒回鸡蛋，加盐和一点点糖，翻匀撒葱花出锅。'
    ],
    nutrition: { kcal: 220, protein: 11, fat: 15, carbs: 9, calcium: 60, iron: 2.0 },
    tip: '鸡蛋是性价比最高的优质蛋白来源之一，番茄红素与油脂同炒吸收率更高。'
  },
  {
    id: 'm02',
    name: '清蒸鲈鱼',
    type: 'meat',
    heavy: true,
    spicy: false,
    tags: ['高蛋白', '低脂', 'DHA', '儿童友好'],
    time: 20,
    difficulty: '中等',
    ingredients: [
      { name: '鲈鱼', amount: 200, unit: 'g', category: '水产海鲜', note: '约半条，让店家处理干净' },
      { name: '姜', amount: 10, unit: 'g', category: '蔬菜水果' },
      { name: '小葱', amount: 10, unit: 'g', category: '蔬菜水果' },
      { name: '蒸鱼豉油', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '食用油', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '鲈鱼洗净擦干，两面各划两刀，塞入姜片，鱼肚放葱段。',
      '蒸锅水开后放入，大火蒸 8-10 分钟（筷子能轻松插入最厚处即熟）。',
      '倒掉盘中腥水，铺上葱丝。',
      '淋 2 勺蒸鱼豉油，烧一勺热油浇在葱丝上激出香味。'
    ],
    nutrition: { kcal: 240, protein: 32, fat: 11, carbs: 2, calcium: 90, iron: 1.5 },
    tip: '每周吃鱼 2 次以上是膳食指南的明确建议，清蒸最大程度保留 DHA，对孩子大脑发育有益。给孩子吃时注意挑刺。'
  },
  {
    id: 'm03',
    name: '香菇蒸鸡',
    type: 'meat',
    heavy: true,
    spicy: false,
    tags: ['低油', '下饭', '适合老人'],
    time: 30,
    difficulty: '简单',
    ingredients: [
      { name: '鸡腿肉', amount: 150, unit: 'g', category: '肉禽蛋', note: '去骨切块更方便' },
      { name: '干香菇', amount: 8, unit: 'g', category: '调味干货', note: '提前泡发' },
      { name: '姜', amount: 5, unit: 'g', category: '蔬菜水果' },
      { name: '小葱', amount: 5, unit: 'g', category: '蔬菜水果' },
      { name: '生抽', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '蚝油', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '玉米淀粉', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '干香菇提前 1 小时泡发，切片；泡香菇的水留用。',
      '鸡腿肉切块，加生抽、蚝油、淀粉、姜丝和两勺香菇水抓匀，腌 15 分钟。',
      '鸡块和香菇铺盘，水开后上锅蒸 15 分钟。',
      '出锅撒葱花，汤汁拌饭一绝。'
    ],
    nutrition: { kcal: 260, protein: 26, fat: 14, carbs: 6, calcium: 40, iron: 1.8 },
    tip: '蒸的做法用油极少，鸡腿肉比鸡胸更嫩，蛋白质同样优质，适合牙口不好的老人。'
  },
  {
    id: 'm04',
    name: '红烧排骨',
    type: 'meat',
    heavy: true,
    spicy: false,
    tags: ['硬菜', '补钙搭档'],
    time: 50,
    difficulty: '中等',
    ingredients: [
      { name: '猪肋排', amount: 180, unit: 'g', category: '肉禽蛋' },
      { name: '姜', amount: 10, unit: 'g', category: '蔬菜水果' },
      { name: '小葱', amount: 10, unit: 'g', category: '蔬菜水果' },
      { name: '冰糖', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '生抽', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '老抽', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '料酒', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '排骨冷水下锅，加料酒和姜片焯水，撇净浮沫捞出。',
      '锅中少油放冰糖，小火炒出焦糖色，下排骨翻炒上色。',
      '加生抽、老抽、葱姜和没过排骨的热水，大火烧开。',
      '转小火炖 35 分钟，最后大火收汁至浓稠裹住排骨。'
    ],
    nutrition: { kcal: 330, protein: 22, fat: 24, carbs: 8, calcium: 30, iron: 2.2 },
    tip: '红烧菜脂肪偏高，一周安排 1-2 次即可，当天其他菜以清淡少油为宜（本菜单已自动搭配）。'
  },
  {
    id: 'm05',
    name: '虾仁滑蛋',
    type: 'meat',
    spicy: false,
    tags: ['高蛋白', '低脂', '快手', '儿童友好'],
    time: 15,
    difficulty: '中等',
    ingredients: [
      { name: '冷冻虾仁', amount: 80, unit: 'g', category: '水产海鲜' },
      { name: '鸡蛋', amount: 1.5, unit: '个', category: '肉禽蛋' },
      { name: '小葱', amount: 5, unit: 'g', category: '蔬菜水果' },
      { name: '玉米淀粉', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '食盐', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '虾仁解冻擦干，用少许盐和淀粉抓匀腌 5 分钟。',
      '热锅滑油，虾仁炒至变色盛出。',
      '鸡蛋加盐打散，倒入虾仁拌匀。',
      '锅中重新下油，倒入虾仁蛋液，小火轻推至八分凝固立刻出锅，撒葱花。'
    ],
    nutrition: { kcal: 230, protein: 24, fat: 14, carbs: 3, calcium: 80, iron: 1.6 },
    tip: '虾仁高蛋白低脂肪，和鸡蛋组合氨基酸互补，嫩滑口感孩子接受度极高。'
  },
  {
    id: 'm06',
    name: '青椒肉丝',
    type: 'meat',
    spicy: false,
    tags: ['下饭', '快手'],
    time: 20,
    difficulty: '中等',
    ingredients: [
      { name: '猪里脊肉', amount: 100, unit: 'g', category: '肉禽蛋' },
      { name: '青椒（菜椒不辣）', amount: 100, unit: 'g', category: '蔬菜水果' },
      { name: '姜', amount: 5, unit: 'g', category: '蔬菜水果' },
      { name: '生抽', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '玉米淀粉', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '料酒', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '里脊顺纹切丝，加生抽、料酒、淀粉抓匀腌 10 分钟。',
      '青椒去籽切丝。',
      '热锅热油下肉丝，快速滑散至变色盛出。',
      '底油下姜丝和青椒丝炒 1 分钟，倒回肉丝加生抽翻匀出锅。'
    ],
    nutrition: { kcal: 240, protein: 20, fat: 15, carbs: 8, calcium: 25, iron: 2.4 },
    tip: '选不辣的菜椒即可全家共享；青椒维生素 C 含量比橙子还高，快炒能保留大部分。'
  },
  {
    id: 'm07',
    name: '土豆炖牛腩',
    type: 'meat',
    heavy: true,
    spicy: false,
    tags: ['补铁', '硬菜', '适合老人'],
    time: 90,
    difficulty: '中等',
    ingredients: [
      { name: '牛腩', amount: 120, unit: 'g', category: '肉禽蛋' },
      { name: '土豆', amount: 120, unit: 'g', category: '蔬菜水果' },
      { name: '胡萝卜', amount: 60, unit: 'g', category: '蔬菜水果' },
      { name: '姜', amount: 10, unit: 'g', category: '蔬菜水果' },
      { name: '八角', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '生抽', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '老抽', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '料酒', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '牛腩切块冷水下锅，加料酒焯水后捞出冲净。',
      '热锅少油下姜片、八角爆香，下牛腩翻炒 2 分钟。',
      '加生抽、老抽和热水没过牛腩，小火炖 60 分钟（高压锅 25 分钟）。',
      '下土豆块和胡萝卜块再炖 15 分钟，收汁调味即可。'
    ],
    nutrition: { kcal: 310, protein: 24, fat: 16, carbs: 18, calcium: 30, iron: 3.6 },
    tip: '牛肉的血红素铁吸收率远高于植物性铁，是女性和儿童补铁的优选；炖软后老人也好嚼。'
  },
  {
    id: 'm08',
    name: '麻婆豆腐',
    type: 'meat',
    spicy: true,
    tags: ['下饭', '川味'],
    time: 20,
    difficulty: '中等',
    ingredients: [
      { name: '嫩豆腐', amount: 150, unit: 'g', category: '奶品豆制品' },
      { name: '猪肉末', amount: 50, unit: 'g', category: '肉禽蛋' },
      { name: '小葱', amount: 5, unit: 'g', category: '蔬菜水果' },
      { name: '蒜', amount: 5, unit: 'g', category: '蔬菜水果' },
      { name: '豆瓣酱', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '花椒粉', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '玉米淀粉', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '豆腐切块，淡盐水中浸泡 5 分钟去豆腥、更不易碎。',
      '热锅下油炒香肉末，加一勺豆瓣酱炒出红油，下蒜末。',
      '加半碗水烧开，轻轻推入豆腐煮 3 分钟。',
      '淀粉水勾芡，撒花椒粉和葱花出锅。'
    ],
    nutrition: { kcal: 250, protein: 16, fat: 18, carbs: 7, calcium: 180, iron: 2.6 },
    tip: '豆腐富含钙和大豆蛋白。此菜偏辣，家有低龄儿童时菜单会自动避开。'
  },
  {
    id: 'm09',
    name: '蒜蓉粉丝蒸虾',
    type: 'meat',
    heavy: true,
    spicy: false,
    tags: ['高蛋白', '宴客也拿得出手'],
    time: 25,
    difficulty: '中等',
    ingredients: [
      { name: '基围虾', amount: 120, unit: 'g', category: '水产海鲜' },
      { name: '龙口粉丝', amount: 25, unit: 'g', category: '米面粮油' },
      { name: '蒜', amount: 15, unit: 'g', category: '蔬菜水果' },
      { name: '小葱', amount: 5, unit: 'g', category: '蔬菜水果' },
      { name: '蒸鱼豉油', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '粉丝温水泡软铺盘底；虾开背去虾线，摆在粉丝上。',
      '蒜末分两半：一半下油锅小火炒成金黄，与生蒜末混合，加蒸鱼豉油拌成蒜蓉酱。',
      '蒜蓉酱铺在虾上，水开后大火蒸 6 分钟。',
      '出锅撒葱花，浇一勺热油。'
    ],
    nutrition: { kcal: 240, protein: 21, fat: 8, carbs: 22, calcium: 70, iron: 1.8 },
    tip: '虾是低脂高蛋白的代表，粉丝吸满汤汁连孩子都抢着吃；注意给幼儿剥壳。'
  },

  {
    id: 'm10',
    name: '公瑾爆蛋（糖醋流心煎蛋）',
    type: 'meat',
    spicy: false,
    tags: ['小红书爆款', '成本超低', '下饭神器', '快手'],
    time: 10,
    difficulty: '简单',
    ingredients: [
      { name: '鸡蛋', amount: 2, unit: '个', category: '肉禽蛋' },
      { name: '蒜', amount: 5, unit: 'g', category: '蔬菜水果' },
      { name: '小葱', amount: 3, unit: 'g', category: '蔬菜水果' },
      { name: '生抽', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '老抽', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '香醋', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '白糖', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '番茄酱', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '调灵魂料汁：生抽 2 勺 + 老抽半勺 + 香醋 1 勺 + 白糖 1 勺 + 番茄酱 1 勺 + 清水 2 勺。',
      '热锅热油打入鸡蛋，中小火煎至底部焦脆、边缘起泡（流心口感就靠这步）。',
      '下蒜末爆香，倒入料汁煮至冒泡。',
      '小火焖 1 分钟，大火收汁浓稠裹住煎蛋，撒葱花，浇在米饭上绝了。'
    ],
    nutrition: { kcal: 260, protein: 13, fat: 18, carbs: 11, calcium: 55, iron: 2.4 },
    tip: '全网爆火的"穷鬼饭"天花板，一餐成本不到 3 块钱。给孩子吃建议把蛋煎全熟。'
  },
  {
    id: 'm11',
    name: '可乐鸡翅',
    type: 'meat',
    heavy: true,
    spicy: false,
    tags: ['儿童最爱', '零失败'],
    time: 25,
    difficulty: '简单',
    ingredients: [
      { name: '鸡翅中', amount: 150, unit: 'g', category: '肉禽蛋', note: '约 3 个' },
      { name: '可乐', amount: 100, unit: 'ml', category: '米面粮油' },
      { name: '姜', amount: 5, unit: 'g', category: '蔬菜水果' },
      { name: '生抽', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '料酒', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '鸡翅两面各划一刀，冷水加料酒下锅焯水捞出。',
      '少油煎鸡翅至两面金黄。',
      '倒入可乐没过鸡翅，加生抽和姜片，中火煮 15 分钟。',
      '大火收汁至浓稠挂壁即可。'
    ],
    nutrition: { kcal: 300, protein: 22, fat: 18, carbs: 13, calcium: 20, iron: 1.4 },
    tip: '可乐代替糖上色零失败，是孩子点单率最高的家常菜；含糖量不低，一周 1 次为宜。'
  },
  {
    id: 'm12',
    name: '糖醋里脊',
    type: 'meat',
    heavy: true,
    spicy: false,
    tags: ['儿童最爱', '酸甜开胃'],
    time: 30,
    difficulty: '中等',
    ingredients: [
      { name: '猪里脊肉', amount: 100, unit: 'g', category: '肉禽蛋' },
      { name: '鸡蛋', amount: 0.3, unit: '个', category: '肉禽蛋' },
      { name: '玉米淀粉', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '番茄酱', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '白糖', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '香醋', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '里脊逆纹切粗条，加盐 1 克、白胡椒粉少许抓匀腌 10 分钟。',
      '肉条先裹一层蛋液，再滚一层干淀粉，抖掉多余的粉。',
      '油温六成热（木筷插入周围冒小泡）下锅炸 2 分钟至定型捞出，升高油温复炸 30 秒更酥脆。',
      '另起锅：番茄酱 2 勺 + 白糖 1 勺 + 香醋 1 勺 + 清水小半碗，小火熬至浓稠冒大泡。',
      '倒入炸好的里脊，大火快速翻裹糖醋汁，立刻出锅口感最酥。'
    ],
    nutrition: { kcal: 310, protein: 20, fat: 16, carbs: 22, calcium: 20, iron: 2.0 },
    tip: '外酥里嫩酸甜口，挑食的孩子也买账；油炸菜当天其他菜自动配清淡的。'
  },
  {
    id: 'm13',
    name: '农家小炒肉',
    type: 'meat',
    spicy: true,
    tags: ['湘味', '下饭神器'],
    time: 15,
    difficulty: '中等',
    ingredients: [
      { name: '五花肉', amount: 80, unit: 'g', category: '肉禽蛋' },
      { name: '螺丝椒', amount: 60, unit: 'g', category: '蔬菜水果' },
      { name: '蒜', amount: 5, unit: 'g', category: '蔬菜水果' },
      { name: '生抽', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '豆豉', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '五花肉切 2 毫米薄片，螺丝椒去蒂斜切段。',
      '干锅不放油，中火把螺丝椒煸 2 分钟至表面起虎皮，盛出备用。',
      '五花肉下锅小火煸 2-3 分钟逼出油脂，至边缘微卷微焦。',
      '下蒜片、豆豉爆香，倒回螺丝椒，加生抽 1 勺大火翻炒 30 秒出锅。'
    ],
    nutrition: { kcal: 320, protein: 14, fat: 28, carbs: 5, calcium: 20, iron: 1.6 },
    tip: '湖南人的米饭杀手。偏辣，家有低龄儿童时菜单自动避开。'
  },
  {
    id: 'm14',
    name: '蒜苔炒肉末',
    type: 'meat',
    spicy: false,
    tags: ['下饭', '快手'],
    time: 12,
    difficulty: '简单',
    ingredients: [
      { name: '蒜苔', amount: 100, unit: 'g', category: '蔬菜水果' },
      { name: '猪肉末', amount: 60, unit: 'g', category: '肉禽蛋' },
      { name: '生抽', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '蚝油', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '蒜苔切小粒，肉末用少许生抽抓匀。',
      '热锅下油炒散肉末至微焦盛出。',
      '下蒜苔粒中火炒 2 分钟至断生。',
      '倒回肉末，加生抽、蚝油翻匀出锅，拌饭拌面都香。'
    ],
    nutrition: { kcal: 240, protein: 15, fat: 16, carbs: 9, calcium: 30, iron: 2.0 },
    tip: '蒜苔富含大蒜素和膳食纤维；这道菜咸香颗粒感强，特别适合拌在孩子饭里。'
  },
  {
    id: 'm15',
    name: '金针菇肥牛卷',
    type: 'meat',
    heavy: true,
    spicy: false,
    tags: ['小红书爆款', '快手', '一锅出'],
    time: 15,
    difficulty: '简单',
    ingredients: [
      { name: '肥牛卷', amount: 80, unit: 'g', category: '肉禽蛋' },
      { name: '金针菇', amount: 100, unit: 'g', category: '蔬菜水果' },
      { name: '小葱', amount: 5, unit: 'g', category: '蔬菜水果' },
      { name: '蒜', amount: 5, unit: 'g', category: '蔬菜水果' },
      { name: '生抽', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '蚝油', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '金针菇切根撕散铺盘底；肥牛卷沸水烫 30 秒变色捞出，铺在金针菇上。',
      '调汁：生抽 2 勺 + 蚝油 1 勺 + 糖半勺 + 水 3 勺。',
      '蒜末下油锅爆香，倒入料汁烧开，浇在肥牛金针菇上。',
      '整盘上锅蒸 8 分钟（或微波 5 分钟），撒葱花出锅。'
    ],
    nutrition: { kcal: 280, protein: 17, fat: 21, carbs: 6, calcium: 25, iron: 2.2 },
    tip: '肥牛提供优质蛋白和铁，金针菇吸满汤汁；蒸制做法比酸汤肥牛更清淡适合全家。'
  },
  {
    id: 'm16',
    name: '韭菜炒鸡蛋',
    type: 'meat',
    spicy: false,
    tags: ['经典', '快手', '成本超低'],
    time: 8,
    difficulty: '简单',
    ingredients: [
      { name: '韭菜', amount: 100, unit: 'g', category: '蔬菜水果' },
      { name: '鸡蛋', amount: 1.5, unit: '个', category: '肉禽蛋' },
      { name: '食盐', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '韭菜洗净切段，蛋液加少许盐打散。',
      '热锅热油倒入蛋液，凝固后划散盛出。',
      '下韭菜大火快炒 30 秒。',
      '倒回鸡蛋翻匀，加盐出锅，前后不到 2 分钟。'
    ],
    nutrition: { kcal: 210, protein: 12, fat: 15, carbs: 7, calcium: 70, iron: 2.2 },
    tip: '韭菜的膳食纤维和硫化物有助肠道健康，和鸡蛋是几十年验证过的黄金搭配。'
  },
  {
    id: 'm17',
    name: '红烧带鱼',
    type: 'meat',
    heavy: true,
    spicy: false,
    tags: ['家常经典', '高蛋白'],
    time: 30,
    difficulty: '中等',
    ingredients: [
      { name: '带鱼', amount: 150, unit: 'g', category: '水产海鲜', note: '选中段，让店家处理好' },
      { name: '姜', amount: 8, unit: 'g', category: '蔬菜水果' },
      { name: '小葱', amount: 8, unit: 'g', category: '蔬菜水果' },
      { name: '生抽', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '老抽', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '料酒', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '玉米淀粉', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '带鱼段擦干，两面拍薄薄一层干淀粉（防溅油、皮不破）。',
      '热锅热油煎至两面金黄定型再翻面。',
      '下姜片葱段，烹料酒，加生抽、老抽、半碗热水。',
      '中火烧 8 分钟，收汁至浓稠即可。'
    ],
    nutrition: { kcal: 280, protein: 26, fat: 17, carbs: 5, calcium: 45, iron: 1.8 },
    tip: '带鱼 DHA 含量可观且刺相对好挑（一根主刺）；给孩子吃选中段最省心。'
  },
  {
    id: 'm18',
    name: '宫保鸡丁',
    type: 'meat',
    heavy: true,
    spicy: true,
    tags: ['川味经典', '下饭'],
    time: 20,
    difficulty: '中等',
    ingredients: [
      { name: '鸡腿肉', amount: 100, unit: 'g', category: '肉禽蛋' },
      { name: '花生米', amount: 20, unit: 'g', category: '调味干货' },
      { name: '黄瓜', amount: 30, unit: 'g', category: '蔬菜水果' },
      { name: '小葱', amount: 10, unit: 'g', category: '蔬菜水果' },
      { name: '干辣椒', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '花椒粉', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '生抽', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '香醋', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '白糖', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '鸡腿肉切 2 厘米小丁，加生抽半勺、淀粉半勺抓匀腌 10 分钟锁住水分。',
      '调宫保汁：生抽 2 勺 + 香醋 1.5 勺 + 白糖 1 勺 + 淀粉半勺 + 清水 2 勺搅匀。',
      '花生米冷油下锅，小火慢炸至微黄、有噼啪声捞出，晾凉更酥脆。',
      '热锅热油下鸡丁，大火滑散炒至变色，转小火下干辣椒段爆香，撒少许花椒粉。',
      '倒入宫保汁大火炒至浓稠起泡，加黄瓜丁、葱段和花生米翻匀出锅。'
    ],
    nutrition: { kcal: 320, protein: 22, fat: 21, carbs: 12, calcium: 25, iron: 1.8 },
    tip: '酸甜微辣的经典荔枝口。偏辣，家有低龄儿童时菜单自动避开。'
  },
  {
    id: 'm19',
    name: '鱼香肉丝',
    type: 'meat',
    spicy: true,
    tags: ['川味经典', '下饭神器'],
    time: 20,
    difficulty: '中等',
    ingredients: [
      { name: '猪里脊肉', amount: 80, unit: 'g', category: '肉禽蛋' },
      { name: '干木耳', amount: 3, unit: 'g', category: '调味干货', note: '提前泡发' },
      { name: '胡萝卜', amount: 30, unit: 'g', category: '蔬菜水果' },
      { name: '青椒（菜椒不辣）', amount: 30, unit: 'g', category: '蔬菜水果' },
      { name: '豆瓣酱', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '生抽', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '香醋', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '白糖', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '玉米淀粉', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '里脊顺纹切细丝，加生抽半勺、淀粉半勺抓匀腌 10 分钟；干木耳提前泡发切丝。',
      '调鱼香汁：生抽 1 勺 + 香醋 2 勺 + 白糖 1.5 勺 + 淀粉半勺 + 清水 3 勺搅匀。',
      '热锅热油下肉丝，大火快速滑散炒至变色盛出。',
      '底油下豆瓣酱小火炒出红油，下木耳丝、胡萝卜丝、青椒丝中火炒 1 分钟。',
      '倒回肉丝，淋入鱼香汁，大火炒至汤汁浓稠裹匀出锅。'
    ],
    nutrition: { kcal: 270, protein: 17, fat: 17, carbs: 13, calcium: 30, iron: 2.6 },
    tip: '没有鱼却叫鱼香，酸甜咸辣平衡的典范。偏辣，家有低龄儿童时自动避开。'
  },
  {
    id: 'm20',
    name: '平菇炒肉片',
    type: 'meat',
    spicy: false,
    tags: ['家常', '快手', '便宜大碗'],
    time: 12,
    difficulty: '简单',
    ingredients: [
      { name: '平菇', amount: 100, unit: 'g', category: '蔬菜水果' },
      { name: '猪里脊肉', amount: 60, unit: 'g', category: '肉禽蛋' },
      { name: '蒜', amount: 5, unit: 'g', category: '蔬菜水果' },
      { name: '生抽', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '蚝油', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '平菇撕成条，干锅中火煸 2 分钟逼出水分盛出（这步是香的关键）。',
      '里脊切薄片，加生抽半勺、淀粉半勺抓匀腌 5 分钟锁住水分。',
      '热锅热油下肉片，大火滑散炒至完全变色。',
      '下蒜片爆香，倒回平菇，加生抽半勺、蚝油 1 勺大火翻炒 1 分钟出锅。'
    ],
    nutrition: { kcal: 200, protein: 16, fat: 12, carbs: 8, calcium: 20, iron: 1.8 },
    tip: '菌菇的鲜味物质和肉是天然增鲜组合，干煸去水后口感更接近肉。'
  },
  {
    id: 'm21',
    name: '电饭煲酱油鸡腿',
    type: 'meat',
    heavy: true,
    spicy: false,
    tags: ['小红书爆款', '懒人零失败', '一锅出'],
    time: 40,
    difficulty: '简单',
    ingredients: [
      { name: '鸡腿肉', amount: 180, unit: 'g', category: '肉禽蛋', note: '整腿更好' },
      { name: '姜', amount: 10, unit: 'g', category: '蔬菜水果' },
      { name: '小葱', amount: 10, unit: 'g', category: '蔬菜水果' },
      { name: '生抽', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '老抽', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '白糖', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '鸡腿扎几个孔，用生抽 3 勺 + 老抽 1 勺 + 糖 1 勺 + 姜片腌 20 分钟。',
      '电饭煲底铺葱段姜片，放入鸡腿和全部腌汁，不加水。',
      '按下煮饭键，跳闸后翻面再焖 10 分钟。',
      '取出切块，浇上煲底的酱汁。'
    ],
    nutrition: { kcal: 290, protein: 28, fat: 18, carbs: 6, calcium: 20, iron: 1.6 },
    tip: '小红书百万收藏的懒人做法：不用看火，电饭煲全自动，汁水拌饭一流。'
  },
  {
    id: 'm22',
    name: '香煎龙利鱼',
    type: 'meat',
    heavy: true,
    spicy: false,
    tags: ['无刺', '低脂高蛋白', '儿童友好'],
    time: 15,
    difficulty: '简单',
    ingredients: [
      { name: '龙利鱼柳', amount: 120, unit: 'g', category: '水产海鲜', note: '冷冻柳，无刺' },
      { name: '黑胡椒', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '食盐', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '玉米淀粉', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '龙利鱼柳解冻后用厨房纸彻底吸干水分（不腥、不溅油的关键）。',
      '两面抹匀盐 2 克和黑胡椒，再拍薄薄一层干淀粉锁住水分。',
      '平底锅少油烧热，转中火每面煎 3 分钟，定型前不要翻动。',
      '煎至两面金黄、鱼肉最厚处用筷子能轻松分开即全熟，趁热出锅。'
    ],
    nutrition: { kcal: 190, protein: 24, fat: 9, carbs: 4, calcium: 25, iron: 0.8 },
    tip: '完全无刺，是给孩子和老人加鱼类蛋白最省心的选择；低脂适合控体重成员。'
  },
  {
    id: 'm23',
    name: '肉末蒸水蛋',
    type: 'meat',
    spicy: false,
    tags: ['儿童友好', '适合老人', '嫩滑'],
    time: 20,
    difficulty: '简单',
    ingredients: [
      { name: '鸡蛋', amount: 1, unit: '个', category: '肉禽蛋' },
      { name: '猪肉末', amount: 30, unit: 'g', category: '肉禽蛋' },
      { name: '小葱', amount: 3, unit: 'g', category: '蔬菜水果' },
      { name: '生抽', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '鸡蛋打散，加 1.5 倍温水和少许盐，过筛去泡沫。',
      '盖保鲜膜扎孔，水开后中火蒸 10 分钟。',
      '肉末用生抽炒香炒散。',
      '把肉末连汁浇在蒸蛋上，撒葱花。'
    ],
    nutrition: { kcal: 180, protein: 14, fat: 13, carbs: 2, calcium: 40, iron: 1.6 },
    tip: '布丁般嫩滑，从 1 岁幼儿到牙口不好的老人通吃；1.5 倍温水 + 过筛是嫩的秘诀。'
  },

  // ================= 素菜 =================
  {
    id: 'v01',
    name: '蒜蓉西兰花',
    type: 'veg',
    spicy: false,
    tags: ['深色蔬菜', '快手'],
    time: 10,
    difficulty: '简单',
    ingredients: [
      { name: '西兰花', amount: 150, unit: 'g', category: '蔬菜水果' },
      { name: '蒜', amount: 8, unit: 'g', category: '蔬菜水果' },
      { name: '食用油', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '食盐', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '西兰花掰小朵，淡盐水浸泡 10 分钟后洗净。',
      '水开后加少许盐和几滴油，焯水 1 分半捞出。',
      '热锅下油爆香蒜末。',
      '下西兰花大火翻炒 1 分钟，加盐调味出锅。'
    ],
    nutrition: { kcal: 90, protein: 5, fat: 5, carbs: 8, calcium: 80, iron: 1.2 },
    tip: '西兰花是"深色蔬菜"代表，维生素 C、叶酸和钙都可观；先焯后炒颜色翠绿口感好。'
  },
  {
    id: 'v02',
    name: '蒜蓉油麦菜',
    type: 'veg',
    spicy: false,
    tags: ['绿叶菜', '快手'],
    time: 8,
    difficulty: '简单',
    ingredients: [
      { name: '油麦菜', amount: 150, unit: 'g', category: '蔬菜水果' },
      { name: '蒜', amount: 8, unit: 'g', category: '蔬菜水果' },
      { name: '食用油', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '食盐', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '油麦菜洗净切长段，沥干水分。',
      '热锅热油爆香蒜末。',
      '下油麦菜大火快炒 40 秒至断生。',
      '加盐翻匀立刻出锅，久炒会出水发苦。'
    ],
    nutrition: { kcal: 70, protein: 3, fat: 5, carbs: 5, calcium: 70, iron: 1.4 },
    tip: '膳食指南建议每天 300-500g 蔬菜、其中一半是深色叶菜，一盘蒜蓉绿叶菜是最简单的达标方式。'
  },
  {
    id: 'v03',
    name: '醋溜土豆丝',
    type: 'veg',
    spicy: false,
    tags: ['下饭', '经典'],
    time: 15,
    difficulty: '简单',
    ingredients: [
      { name: '土豆', amount: 130, unit: 'g', category: '蔬菜水果' },
      { name: '青椒（菜椒不辣）', amount: 30, unit: 'g', category: '蔬菜水果' },
      { name: '香醋', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '食盐', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '食用油', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '土豆切细丝，清水冲洗两遍去淀粉，泡在水中防氧化。',
      '青椒切丝备用。',
      '热锅热油，下土豆丝大火快炒 2 分钟。',
      '沿锅边烹入香醋，下青椒丝，加盐炒 30 秒出锅，口感脆爽。'
    ],
    nutrition: { kcal: 130, protein: 3, fat: 5, carbs: 20, calcium: 15, iron: 0.8 },
    tip: '土豆丝算"半个主食"，当天菜单会自动平衡主食量；醋能延缓淀粉消化、稳定餐后血糖。'
  },
  {
    id: 'v04',
    name: '白灼菜心',
    type: 'veg',
    spicy: false,
    tags: ['绿叶菜', '低油', '适合老人'],
    time: 10,
    difficulty: '简单',
    ingredients: [
      { name: '菜心', amount: 150, unit: 'g', category: '蔬菜水果' },
      { name: '姜', amount: 3, unit: 'g', category: '蔬菜水果' },
      { name: '生抽', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '食用油', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '菜心洗净，粗茎底部切十字刀更易熟。',
      '水开后加几滴油，下菜心烫 1 分钟捞出摆盘。',
      '生抽加一勺焯菜水调成豉油汁，淋在菜心上。',
      '热油爆香姜丝，浇上即可。'
    ],
    nutrition: { kcal: 60, protein: 3, fat: 4, carbs: 4, calcium: 100, iron: 1.2 },
    tip: '白灼是用油最少的蔬菜做法；菜心的钙含量在绿叶菜中名列前茅。'
  },
  {
    id: 'v05',
    name: '家常烧豆腐',
    type: 'veg',
    spicy: false,
    tags: ['植物蛋白', '补钙', '下饭'],
    time: 15,
    difficulty: '简单',
    ingredients: [
      { name: '老豆腐', amount: 150, unit: 'g', category: '奶品豆制品' },
      { name: '青椒（菜椒不辣）', amount: 30, unit: 'g', category: '蔬菜水果' },
      { name: '胡萝卜', amount: 30, unit: 'g', category: '蔬菜水果' },
      { name: '小葱', amount: 5, unit: 'g', category: '蔬菜水果' },
      { name: '生抽', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '蚝油', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '老豆腐切 1 厘米厚片，用厨房纸吸干表面水分，煎的时候不溅油。',
      '平底锅下油，中火把豆腐每面煎 3 分钟至金黄，盛出备用。',
      '底油下青椒片、胡萝卜片中火炒 1 分钟。',
      '倒回豆腐，加生抽 1 勺、蚝油 1 勺和小半碗清水，中火烧 3 分钟入味。',
      '大火收汁，撒葱花出锅。'
    ],
    nutrition: { kcal: 160, protein: 12, fat: 10, carbs: 6, calcium: 250, iron: 2.5 },
    tip: '老豆腐（北豆腐）用卤水点制，钙含量是嫩豆腐的两倍多，是素食补钙主力。'
  },
  {
    id: 'v06',
    name: '凉拌黄瓜木耳',
    type: 'veg',
    spicy: false,
    tags: ['爽口', '零失败'],
    time: 15,
    difficulty: '简单',
    ingredients: [
      { name: '黄瓜', amount: 100, unit: 'g', category: '蔬菜水果' },
      { name: '干木耳', amount: 5, unit: 'g', category: '调味干货', note: '泡发后约 50g' },
      { name: '蒜', amount: 5, unit: 'g', category: '蔬菜水果' },
      { name: '香醋', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '生抽', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '香油', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '木耳提前冷水泡发 1 小时，撕小朵，沸水煮 3 分钟捞出过凉。',
      '黄瓜拍裂切段。',
      '蒜末、香醋、生抽、香油调成料汁。',
      '全部拌匀，冷藏 10 分钟更入味。'
    ],
    nutrition: { kcal: 60, protein: 2, fat: 4, carbs: 6, calcium: 40, iron: 2.8 },
    tip: '木耳的铁和膳食纤维含量突出；凉拌菜为夏日餐桌解腻。注意木耳泡发别超过 4 小时。'
  },
  {
    id: 'v07',
    name: '山药木耳炒胡萝卜',
    type: 'veg',
    spicy: false,
    tags: ['养胃', '适合老人', '色彩丰富'],
    time: 15,
    difficulty: '简单',
    ingredients: [
      { name: '山药', amount: 100, unit: 'g', category: '蔬菜水果' },
      { name: '胡萝卜', amount: 50, unit: 'g', category: '蔬菜水果' },
      { name: '干木耳', amount: 4, unit: 'g', category: '调味干货', note: '提前泡发' },
      { name: '蒜', amount: 5, unit: 'g', category: '蔬菜水果' },
      { name: '食盐', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '食用油', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '山药戴手套去皮切片，泡水防氧化；胡萝卜切片；木耳泡发撕小朵。',
      '山药和木耳沸水焯 1 分钟捞出。',
      '热锅下油爆香蒜片，下胡萝卜炒 1 分钟。',
      '下山药和木耳大火炒 1 分钟，加盐调味出锅。'
    ],
    nutrition: { kcal: 110, protein: 3, fat: 4, carbs: 17, calcium: 30, iron: 2.0 },
    tip: '白、橙、黑三色食材一盘配齐，山药黏液蛋白养胃，胡萝卜素与油同炒才好吸收。'
  },

  {
    id: 'v08',
    name: '虎皮青椒',
    type: 'veg',
    spicy: true,
    tags: ['下饭神器', '成本超低'],
    time: 10,
    difficulty: '简单',
    ingredients: [
      { name: '螺丝椒', amount: 120, unit: 'g', category: '蔬菜水果' },
      { name: '蒜', amount: 5, unit: 'g', category: '蔬菜水果' },
      { name: '生抽', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '香醋', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '白糖', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '螺丝椒去蒂，用刀背拍扁。',
      '干锅不放油，中火把青椒两面压煸出焦斑（虎皮）。',
      '下少许油和蒜末爆香。',
      '加生抽、香醋、糖翻匀，焖 1 分钟出锅。'
    ],
    nutrition: { kcal: 90, protein: 3, fat: 5, carbs: 10, calcium: 25, iron: 1.0 },
    tip: '维 C 大户配一点点糖醋汁，两块钱的青椒能干掉两碗饭。偏辣，有低龄儿童时自动避开。'
  },
  {
    id: 'v09',
    name: '蚝油生菜',
    type: 'veg',
    spicy: false,
    tags: ['快手', '低油'],
    time: 8,
    difficulty: '简单',
    ingredients: [
      { name: '生菜', amount: 150, unit: 'g', category: '蔬菜水果' },
      { name: '蒜', amount: 5, unit: 'g', category: '蔬菜水果' },
      { name: '蚝油', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '生抽', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '水开加几滴油，生菜烫 20 秒立刻捞出摆盘。',
      '调汁：蚝油 1.5 勺 + 生抽半勺 + 水 2 勺 + 淀粉少许。',
      '料汁小火熬至微稠，加蒜末。',
      '浇在生菜上即可。'
    ],
    nutrition: { kcal: 70, protein: 3, fat: 4, carbs: 6, calcium: 50, iron: 1.2 },
    tip: '茶餐厅经典，20 秒焯烫保住生菜的脆嫩，是最快达成"每餐有绿叶菜"的方式之一。'
  },
  {
    id: 'v10',
    name: '地三鲜（少油版）',
    type: 'veg',
    spicy: false,
    tags: ['东北经典', '下饭'],
    time: 25,
    difficulty: '中等',
    ingredients: [
      { name: '土豆', amount: 80, unit: 'g', category: '蔬菜水果' },
      { name: '茄子', amount: 80, unit: 'g', category: '蔬菜水果' },
      { name: '青椒（菜椒不辣）', amount: 30, unit: 'g', category: '蔬菜水果' },
      { name: '蒜', amount: 8, unit: 'g', category: '蔬菜水果' },
      { name: '生抽', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '蚝油', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '玉米淀粉', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '茄子切滚刀块撒 2 克盐腌 10 分钟，挤干水分（少吸油的关键）；土豆去皮切滚刀块，青椒掰小块。',
      '平底锅少油，中火把土豆块煎 5-6 分钟至边缘金黄、筷子能扎透，盛出。',
      '同锅把茄子中火煎 3-4 分钟至变软塌，盛出备用。',
      '小碗调汁：生抽 1 瓷勺、蚝油 1 瓷勺、玉米淀粉半勺，加 3 勺清水搅匀。',
      '锅内余油下蒜末小火爆香，倒回土豆和茄子，加青椒块大火翻炒半分钟。',
      '倒入料汁翻匀，煮到汤汁收浓、亮亮地裹在每块菜上即可出锅。'
    ],
    nutrition: { kcal: 160, protein: 4, fat: 8, carbs: 20, calcium: 25, iron: 1.2 },
    tip: '经典做法要过三遍油，这版盐腌茄子 + 少油煎，味道不打折、油少一大半。'
  },
  {
    id: 'v11',
    name: '干煸四季豆（家常版）',
    type: 'veg',
    spicy: false,
    tags: ['下饭', '干香'],
    time: 15,
    difficulty: '中等',
    ingredients: [
      { name: '四季豆', amount: 120, unit: 'g', category: '蔬菜水果' },
      { name: '蒜', amount: 8, unit: 'g', category: '蔬菜水果' },
      { name: '生抽', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '四季豆撕去两头老筋掰成 5 厘米段，洗净后务必晾干水分，下锅才不溅油。',
      '锅里放比平时炒菜多一点的油，中小火把四季豆煸 5-6 分钟，少翻动，让表皮起皱、颜色变深——这是完全熟透的标志。',
      '把四季豆拨到锅边，下蒜末小火爆香约 20 秒至微微发黄。',
      '加生抽 1 瓷勺和 1 克盐，转大火快速翻匀出锅，干香下饭。'
    ],
    nutrition: { kcal: 110, protein: 4, fat: 7, carbs: 10, calcium: 50, iron: 1.4 },
    tip: '四季豆必须彻底做熟，生的含皂苷会引起呕吐——表皮起皱、颜色变深才算到位。'
  },
  {
    id: 'v12',
    name: '凉拌手撕茄子',
    type: 'veg',
    spicy: false,
    tags: ['小红书爆款', '低油', '爽口'],
    time: 20,
    difficulty: '简单',
    ingredients: [
      { name: '茄子', amount: 150, unit: 'g', category: '蔬菜水果' },
      { name: '蒜', amount: 8, unit: 'g', category: '蔬菜水果' },
      { name: '小葱', amount: 3, unit: 'g', category: '蔬菜水果' },
      { name: '生抽', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '香醋', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '香油', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '长茄子整根上锅蒸 15 分钟，筷子能轻松扎透。',
      '放凉后手撕成条。',
      '料汁：蒜末 + 生抽 2 勺 + 香醋 1 勺 + 香油几滴。',
      '浇汁拌匀撒葱花，冰镇后更好吃。'
    ],
    nutrition: { kcal: 80, protein: 2, fat: 4, carbs: 10, calcium: 20, iron: 0.8 },
    tip: '茄子不过油就是低卡菜，蒸制保留花青素；夏天冰镇一下比肉还抢手。'
  },
  {
    id: 'v13',
    name: '糖醋脆皮豆腐',
    type: 'veg',
    spicy: false,
    tags: ['小红书爆款', '补钙', '儿童最爱'],
    time: 20,
    difficulty: '简单',
    ingredients: [
      { name: '老豆腐', amount: 150, unit: 'g', category: '奶品豆制品' },
      { name: '小葱', amount: 3, unit: 'g', category: '蔬菜水果' },
      { name: '玉米淀粉', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '番茄酱', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '生抽', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '白糖', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '香醋', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '老豆腐切 2 厘米方块，用厨房纸吸干表面水分，四面滚一层薄薄的干淀粉。',
      '平底锅倒多一点油，中火煎豆腐 6-8 分钟，每面煎到金黄定壳再翻动，才不容易碎。',
      '小碗调汁：番茄酱 2 勺、生抽 1 勺、糖 1 勺、香醋 1 勺，加清水 3 勺搅匀。',
      '料汁倒入锅中转中小火，轻轻翻动裹匀，煮约 1 分钟至收浓起泡。',
      '撒葱花出锅，趁热吃外脆里嫩。'
    ],
    nutrition: { kcal: 190, protein: 12, fat: 11, carbs: 12, calcium: 250, iron: 2.4 },
    tip: '酸甜脆壳让不爱豆腐的孩子也抢着吃，老豆腐钙含量是嫩豆腐的两倍多。'
  },
  {
    id: 'v14',
    name: '蚝油杏鲍菇',
    type: 'veg',
    spicy: false,
    tags: ['小红书爆款', '口感像肉', '快手'],
    time: 12,
    difficulty: '简单',
    ingredients: [
      { name: '杏鲍菇', amount: 130, unit: 'g', category: '蔬菜水果' },
      { name: '蒜', amount: 5, unit: 'g', category: '蔬菜水果' },
      { name: '小葱', amount: 3, unit: 'g', category: '蔬菜水果' },
      { name: '蚝油', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '生抽', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '杏鲍菇切滚刀块或打花刀切厚片。',
      '干锅煸 3 分钟逼出水分至微焦。',
      '加少许油和蒜末爆香。',
      '加蚝油 1 勺、生抽 1 勺和 2 勺水，收汁裹匀撒葱花。'
    ],
    nutrition: { kcal: 90, protein: 4, fat: 4, carbs: 11, calcium: 15, iron: 1.0 },
    tip: '杏鲍菇干煸后有"素鲍鱼"的嚼劲，热量却只有肉的零头，是控体重期的下饭好菜。'
  },
  {
    id: 'v15',
    name: '清炒西葫芦',
    type: 'veg',
    spicy: false,
    tags: ['清淡', '快手', '适合老人'],
    time: 8,
    difficulty: '简单',
    ingredients: [
      { name: '西葫芦', amount: 150, unit: 'g', category: '蔬菜水果' },
      { name: '蒜', amount: 5, unit: 'g', category: '蔬菜水果' },
      { name: '食盐', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '西葫芦对半切后切薄片。',
      '热锅下油爆香蒜片。',
      '下西葫芦大火炒 2 分钟至微微透明。',
      '加盐翻匀立刻出锅，脆嫩多汁。'
    ],
    nutrition: { kcal: 60, protein: 2, fat: 4, carbs: 6, calcium: 20, iron: 0.6 },
    tip: '西葫芦高水分低热量，口感清甜，是餐桌上"没人反对"的百搭素菜。'
  },
  {
    id: 'v16',
    name: '醋溜绿豆芽',
    type: 'veg',
    spicy: false,
    tags: ['成本超低', '爽脆', '快手'],
    time: 6,
    difficulty: '简单',
    ingredients: [
      { name: '绿豆芽', amount: 150, unit: 'g', category: '蔬菜水果' },
      { name: '小葱', amount: 3, unit: 'g', category: '蔬菜水果' },
      { name: '香醋', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '食盐', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '豆芽洗净沥干。',
      '热锅热油下豆芽，全程最大火。',
      '沿锅边烹 2 勺香醋（激出香气）。',
      '加盐快炒 30 秒，撒葱段出锅，脆是灵魂。'
    ],
    nutrition: { kcal: 50, protein: 3, fat: 3, carbs: 5, calcium: 25, iron: 0.8 },
    tip: '两三块钱一大盘，维 C 含量比很多水果还高；大火快炒保脆嫩。'
  },
  {
    id: 'v17',
    name: '手撕包菜',
    type: 'veg',
    spicy: true,
    tags: ['下饭神器', '成本超低'],
    time: 10,
    difficulty: '简单',
    ingredients: [
      { name: '包菜', amount: 150, unit: 'g', category: '蔬菜水果' },
      { name: '蒜', amount: 8, unit: 'g', category: '蔬菜水果' },
      { name: '干辣椒', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '生抽', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '香醋', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '包菜手撕成大片（撕比切香），洗净甩干。',
      '热锅热油下蒜片、干辣椒段爆香。',
      '下包菜最大火快炒 1 分钟。',
      '沿锅边烹生抽和香醋，翻匀出锅带焦边才对味。'
    ],
    nutrition: { kcal: 80, protein: 2, fat: 5, carbs: 8, calcium: 40, iron: 0.8 },
    tip: '饭店点单率最高的素菜之一。含干辣椒，家有低龄儿童时自动避开（可自行去辣椒做不辣版）。'
  },

  // ================= 汤 =================
  {
    id: 's01',
    name: '紫菜虾皮蛋花汤',
    type: 'soup',
    spicy: false,
    tags: ['补钙', '补碘', '快手'],
    time: 8,
    difficulty: '简单',
    ingredients: [
      { name: '干紫菜', amount: 3, unit: 'g', category: '调味干货' },
      { name: '虾皮', amount: 3, unit: 'g', category: '调味干货' },
      { name: '鸡蛋', amount: 0.5, unit: '个', category: '肉禽蛋' },
      { name: '小葱', amount: 3, unit: 'g', category: '蔬菜水果' },
      { name: '香油', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '紫菜撕小片，与虾皮一起放碗底；鸡蛋打散备用。',
      '锅中加约两碗清水，大火烧开后转小火。',
      '把蛋液缓缓淋入锅中，停 5 秒再轻轻推动，蛋花才大片漂亮。',
      '连汤冲入碗中泡开紫菜，虾皮自带咸味，尝一口再决定要不要补盐。',
      '滴两滴香油、撒葱花即成。'
    ],
    nutrition: { kcal: 60, protein: 6, fat: 3, carbs: 2, calcium: 120, iron: 1.5 },
    tip: '紫菜补碘、虾皮补钙，8 分钟就能给一餐加一道汤，几乎零门槛。'
  },
  {
    id: 's02',
    name: '冬瓜排骨汤',
    type: 'soup',
    spicy: false,
    tags: ['清润', '适合老人'],
    time: 60,
    difficulty: '简单',
    ingredients: [
      { name: '猪肋排', amount: 60, unit: 'g', category: '肉禽蛋' },
      { name: '冬瓜', amount: 120, unit: 'g', category: '蔬菜水果' },
      { name: '姜', amount: 5, unit: 'g', category: '蔬菜水果' },
      { name: '食盐', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '排骨冷水下锅，中火煮开后撇净浮沫，捞出用温水冲洗——焯水去腥，汤才清亮。',
      '排骨加姜片和足量热水（约三碗），大火烧开转小火煲 40 分钟。',
      '冬瓜去皮切大块下锅，再煮 15 分钟至冬瓜呈半透明。',
      '出锅前加 2 克盐调味即可，清润不油腻。'
    ],
    nutrition: { kcal: 110, protein: 8, fat: 7, carbs: 3, calcium: 25, iron: 0.9 },
    tip: '冬瓜低热量高水分，夏季消暑；喝汤也要吃肉，蛋白质大部分还在排骨里。'
  },
  {
    id: 's03',
    name: '番茄豆腐汤',
    type: 'soup',
    spicy: false,
    tags: ['开胃', '补钙', '快手'],
    time: 12,
    difficulty: '简单',
    ingredients: [
      { name: '番茄', amount: 80, unit: 'g', category: '蔬菜水果' },
      { name: '嫩豆腐', amount: 80, unit: 'g', category: '奶品豆制品' },
      { name: '小葱', amount: 3, unit: 'g', category: '蔬菜水果' },
      { name: '食盐', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '香油', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '番茄切小块，热锅少油炒出沙。',
      '加两碗热水烧开。',
      '下豆腐块煮 3 分钟。',
      '加盐调味，滴香油撒葱花出锅。'
    ],
    nutrition: { kcal: 70, protein: 5, fat: 4, carbs: 5, calcium: 90, iron: 1.0 },
    tip: '酸甜开胃，饭前一小碗汤有助控制正餐食量，适合需要控制体重的成员。'
  },
  {
    id: 's04',
    name: '玉米胡萝卜筒骨汤',
    type: 'soup',
    spicy: false,
    tags: ['甜口', '儿童友好', '周末煲汤'],
    time: 90,
    difficulty: '简单',
    ingredients: [
      { name: '猪筒骨', amount: 80, unit: 'g', category: '肉禽蛋' },
      { name: '甜玉米', amount: 80, unit: 'g', category: '蔬菜水果', note: '约半根' },
      { name: '胡萝卜', amount: 60, unit: 'g', category: '蔬菜水果' },
      { name: '姜', amount: 5, unit: 'g', category: '蔬菜水果' },
      { name: '食盐', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '筒骨冷水下锅，中火煮开后撇去浮沫，捞出冲净——焯水去腥是好汤的第一步。',
      '筒骨、姜片加足量热水（约四碗），大火滚 5 分钟再转小火煲 1 小时。',
      '甜玉米切段、胡萝卜切滚刀块下锅，再煲 20 分钟至胡萝卜变软。',
      '加 2 克盐调味，汤色奶白清甜，孩子也爱喝。'
    ],
    nutrition: { kcal: 120, protein: 7, fat: 7, carbs: 8, calcium: 30, iron: 1.0 },
    tip: '玉米胡萝卜自带清甜，孩子爱喝；骨头汤本身钙不多，补钙还是靠奶类和豆制品。'
  },

  {
    id: 's05',
    name: '菌菇豆腐汤',
    type: 'soup',
    spicy: false,
    tags: ['鲜掉眉毛', '低卡'],
    time: 15,
    difficulty: '简单',
    ingredients: [
      { name: '蟹味菇', amount: 50, unit: 'g', category: '蔬菜水果' },
      { name: '嫩豆腐', amount: 80, unit: 'g', category: '奶品豆制品' },
      { name: '小葱', amount: 3, unit: 'g', category: '蔬菜水果' },
      { name: '食盐', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '香油', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '蟹味菇去根撕散，热锅少油煸 1 分钟出香。',
      '加两碗热水煮开 3 分钟（汤色转白更鲜）。',
      '下豆腐块再煮 3 分钟。',
      '加盐调味，滴香油撒葱花。'
    ],
    nutrition: { kcal: 70, protein: 6, fat: 4, carbs: 4, calcium: 90, iron: 1.0 },
    tip: '菌菇的天然鲜味物质可以少放盐；豆腐补钙，是一碗几乎零负担的汤。'
  },
  {
    id: 's06',
    name: '萝卜丝虾皮汤',
    type: 'soup',
    spicy: false,
    tags: ['补钙', '清爽', '成本超低'],
    time: 12,
    difficulty: '简单',
    ingredients: [
      { name: '白萝卜', amount: 120, unit: 'g', category: '蔬菜水果' },
      { name: '虾皮', amount: 3, unit: 'g', category: '调味干货' },
      { name: '小葱', amount: 3, unit: 'g', category: '蔬菜水果' },
      { name: '食盐', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '白萝卜擦成细丝。',
      '热锅少油把萝卜丝炒软。',
      '加两碗热水和虾皮，煮 5 分钟至萝卜丝透明。',
      '尝味后补少许盐（虾皮自带咸），撒葱花。'
    ],
    nutrition: { kcal: 45, protein: 3, fat: 2, carbs: 5, calcium: 110, iron: 0.8 },
    tip: '冬吃萝卜的经典喝法，虾皮补钙；萝卜丝先炒后煮，汤更清甜。'
  },
  {
    id: 's07',
    name: '丝瓜蛋花汤',
    type: 'soup',
    spicy: false,
    tags: ['夏日清爽', '快手'],
    time: 10,
    difficulty: '简单',
    ingredients: [
      { name: '丝瓜', amount: 100, unit: 'g', category: '蔬菜水果' },
      { name: '鸡蛋', amount: 0.5, unit: '个', category: '肉禽蛋' },
      { name: '食盐', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '香油', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '丝瓜去皮切滚刀块。',
      '热锅少油翻炒丝瓜 1 分钟。',
      '加两碗热水煮开 3 分钟至丝瓜变软。',
      '转小火淋入蛋液成蛋花，加盐和几滴香油出锅。'
    ],
    nutrition: { kcal: 60, protein: 4, fat: 3, carbs: 4, calcium: 30, iron: 0.8 },
    tip: '丝瓜清热利水，夏天晚餐配一碗，清爽不腻。'
  },
  {
    id: 's08',
    name: '山药排骨汤',
    type: 'soup',
    spicy: false,
    tags: ['养胃', '适合老人', '周末煲汤'],
    time: 70,
    difficulty: '简单',
    ingredients: [
      { name: '猪肋排', amount: 60, unit: 'g', category: '肉禽蛋' },
      { name: '山药', amount: 80, unit: 'g', category: '蔬菜水果' },
      { name: '姜', amount: 5, unit: 'g', category: '蔬菜水果' },
      { name: '食盐', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '排骨冷水下锅，中火煮开撇净浮沫，捞出用温水冲净。',
      '排骨加姜片和足量热水（约三碗），大火烧开转小火煲 45 分钟。',
      '山药去皮切段（怕手痒可戴手套）下锅，再煲 15 分钟至山药粉糯。',
      '加 2 克盐调味即可，汤清味浓。'
    ],
    nutrition: { kcal: 130, protein: 9, fat: 7, carbs: 10, calcium: 25, iron: 1.0 },
    tip: '山药黏液蛋白护胃，和排骨同煲汤头温润，脾胃弱的老人孩子都合适。'
  },

  // ================= 主食 =================
  {
    id: 'st01',
    name: '白米饭',
    type: 'staple',
    spicy: false,
    tags: ['主食'],
    time: 30,
    difficulty: '简单',
    ingredients: [
      { name: '大米', amount: 75, unit: 'g', category: '米面粮油' }
    ],
    steps: [
      '大米淘洗 2 遍。',
      '按米:水 = 1:1.2 加水，电饭煲标准模式煮熟。',
      '煮好后焖 10 分钟再开盖，口感更好。'
    ],
    nutrition: { kcal: 260, protein: 5, fat: 0.5, carbs: 58, calcium: 8, iron: 0.7 },
    tip: '每餐主食约一拳头大小；孩子饭量按其份数系数已自动折算。'
  },
  {
    id: 'st02',
    name: '杂粮饭',
    type: 'staple',
    spicy: false,
    tags: ['粗粮', '控糖'],
    time: 45,
    difficulty: '简单',
    ingredients: [
      { name: '大米', amount: 50, unit: 'g', category: '米面粮油' },
      { name: '糙米', amount: 15, unit: 'g', category: '米面粮油' },
      { name: '小米', amount: 10, unit: 'g', category: '米面粮油' }
    ],
    steps: [
      '糙米提前浸泡 2 小时（或用电饭煲杂粮模式免泡）。',
      '三种米混合淘洗，按米:水 = 1:1.4 加水。',
      '电饭煲杂粮饭模式煮熟，焖 10 分钟。'
    ],
    nutrition: { kcal: 255, protein: 6, fat: 1, carbs: 55, calcium: 12, iron: 1.2 },
    tip: '膳食指南建议全谷物占主食 1/4-1/3，杂粮饭升糖更慢、B 族维生素更丰富。'
  },
  {
    id: 'st03',
    name: '红薯米饭',
    type: 'staple',
    spicy: false,
    tags: ['粗粮', '自带甜味'],
    time: 35,
    difficulty: '简单',
    ingredients: [
      { name: '大米', amount: 60, unit: 'g', category: '米面粮油' },
      { name: '红薯', amount: 50, unit: 'g', category: '蔬菜水果' }
    ],
    steps: [
      '大米淘洗，红薯去皮切 1cm 小丁。',
      '红薯丁铺在米上，按平时煮饭水量正常煮。',
      '煮好拌匀，红薯的甜味会渗进饭里。'
    ],
    nutrition: { kcal: 265, protein: 5, fat: 0.6, carbs: 60, calcium: 15, iron: 0.8 },
    tip: '红薯替掉一部分白米，膳食纤维和胡萝卜素都上来了，孩子还爱吃这口甜。'
  },
  {
    id: 'v63',
    name: '油焖茭白',
    type: 'veg',
    spicy: false,
    tags: ['江南家常', '下饭', '素菜也过瘾'],
    time: 15,
    difficulty: '简单',
    ingredients: [
      { name: '茭白', amount: 200, unit: 'g', category: '蔬菜水果' },
      { name: '小葱', amount: 5, unit: 'g', category: '蔬菜水果' },
      { name: '生抽', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '老抽', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '白糖', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '茭白剥壳削去老皮，切滚刀块，洗净沥干水分。',
      '锅烧热，油比平时炒菜略多一点（约 1.5 瓷勺），中火把茭白煎炒 3 分钟，煎到表面微微发黄起皱——煎透了才吸味。',
      '加生抽 1 瓷勺、老抽小半勺上色、白糖 1 小勺，快速翻匀。',
      '倒小半碗热水，盖上盖子中小火焖 4 分钟，焖到茭白软糯入味。',
      '开盖转大火收汁，收到酱汁浓稠裹在茭白上，撒葱花出锅。'
    ],
    nutrition: { kcal: 130, protein: 3, fat: 8, carbs: 13, calcium: 10, iron: 0.8 },
    tip: '茭白吸油也吸味，油煎这一步别省；浓油赤酱的江南做法，素菜也能当硬菜吃。'
  },
  {
    id: 'm98',
    name: '葱爆醋炒蛋',
    type: 'meat',
    spicy: false,
    tags: ['快手', '下饭', '小红书爆款'],
    time: 8,
    difficulty: '简单',
    ingredients: [
      { name: '鸡蛋', amount: 2, unit: '个', category: '肉禽蛋' },
      { name: '小葱', amount: 20, unit: 'g', category: '蔬菜水果' },
      { name: '香醋', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '食盐', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '鸡蛋加盐 1 克打散，打到表面起一层细泡，炒出来才蓬松。',
      '小葱切葱花，分成两份：一半拌进蛋液，一半留着爆锅。',
      '锅烧热倒油 1.5 瓷勺，油热后下留出的葱花，小火爆出葱香。',
      '转大火倒入蛋液，先别急着动，等底面定型鼓起，再快速划散成大块。',
      '沿锅边烹入香醋 1 瓷勺，酸香被热气一激就出来了，翻两下立刻出锅。'
    ],
    nutrition: { kcal: 205, protein: 13, fat: 16, carbs: 3, calcium: 62, iron: 2.4 },
    tip: '醋一定要沿热锅边烹进去而不是直接浇在蛋上，激出来的醋香只留香不留酸，特别开胃下饭。'
  },
  {
    id: 'm97',
    name: '外婆缸豆牛肉丝',
    type: 'meat',
    spicy: false,
    badge: '外婆拿手',
    tags: ['家传菜', '下饭', '高蛋白'],
    time: 25,
    difficulty: '简单',
    ingredients: [
      { name: '牛里脊', amount: 90, unit: 'g', category: '肉禽蛋' },
      { name: '豇豆（长豆角）', amount: 120, unit: 'g', category: '蔬菜水果' },
      { name: '蒜', amount: 10, unit: 'g', category: '蔬菜水果' },
      { name: '生抽', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '蚝油', amount: 0, unit: '适量', category: '调味干货', pantry: true },
      { name: '玉米淀粉', amount: 0, unit: '适量', category: '调味干货', pantry: true }
    ],
    steps: [
      '牛里脊逆着纹路切细丝，加生抽半瓷勺、淀粉 1 小勺和 1 瓷勺清水抓匀，腌 10 分钟锁住水分。',
      '豇豆撕去两侧的筋，切成小指长的条——记住一定切条，不切丁，这是这道菜口感的关键。',
      '豇豆条下开水锅焯 2 分钟到翠绿断生，捞出沥干；豆角类必须焯熟，半生的有毒素。',
      '锅烧到冒烟，倒油下牛肉丝，大火快速滑散，刚一变色就盛出，多炒 10 秒都会老。',
      '底油下蒜片爆香，倒豇豆条大火炒 1 分钟，加蚝油半瓷勺、生抽半瓷勺翻匀。',
      '牛肉丝回锅，颠匀立刻出锅，回锅前后不超过 30 秒。'
    ],
    nutrition: { kcal: 215, protein: 21, fat: 11, carbs: 8, calcium: 50, iron: 3.0 },
    tip: '卡卡外婆的做法：豆角切条不切丁、牛肉滑炒不超过 30 秒，是这道菜好吃的两个秘密。'
  },
  {
    id: 'st21',
    name: '妈妈咖喱饭',
    type: 'staple',
    solo: true,
    spicy: false,
    badge: '妈妈拿手',
    tags: ['家传菜', '一锅出', '儿童最爱'],
    time: 40,
    difficulty: '简单',
    ingredients: [
      { name: '大米', amount: 70, unit: 'g', category: '米面粮油' },
      { name: '鸡腿肉', amount: 90, unit: 'g', category: '肉禽蛋' },
      { name: '土豆', amount: 100, unit: 'g', category: '蔬菜水果' },
      { name: '胡萝卜', amount: 50, unit: 'g', category: '蔬菜水果' },
      { name: '洋葱', amount: 60, unit: 'g', category: '蔬菜水果' },
      { name: '日式咖喱块', amount: 20, unit: 'g', category: '调味干货' }
    ],
    steps: [
      '大米淘洗后正常水量煮饭；鸡腿肉切块，土豆胡萝卜切滚刀块，洋葱切粗丝。',
      '热锅少油，先下洋葱中火炒 2 分钟，炒到透明发甜——洋葱炒透是咖喱好吃的底子。',
      '下鸡腿肉炒到表面变白，加土豆和胡萝卜翻炒 1 分钟。',
      '倒热水刚没过食材，大火烧开撇去浮沫，转中小火盖盖煮 12 分钟，煮到土豆能用筷子扎透。',
      '关小火，掰入咖喱块搅拌到完全融化，再小火咕嘟 3 分钟到浓稠，期间勤搅动防糊底。',
      '连汤带料浇在热米饭上，开吃。'
    ],
    nutrition: { kcal: 620, protein: 25, fat: 18, carbs: 88, calcium: 45, iron: 2.4 },
    tip: '卡卡妈妈的拿手饭。咖喱块自带咸度，不用再加盐；给小朋友吃选"甘口"（微甜）咖喱块。'
  }
].concat(EXTRA_RECIPES);

function byId(id) {
  return RECIPES.find((r) => r.id === id);
}

function byType(type) {
  return RECIPES.filter((r) => r.type === type);
}

export { RECIPES, byId, byType };
