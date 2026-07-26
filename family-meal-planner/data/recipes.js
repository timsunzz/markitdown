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
      '大米淘洗后加 8 倍水，大火烧开转小火煮 20 分钟至米粒开花。',
      '里脊肉切末，用少许盐和姜丝腌 5 分钟；上海青切碎。',
      '粥煮好后下肉末快速搅散，煮 2 分钟至变色。',
      '放入青菜碎煮 1 分钟，加盐调味；配水煮蛋食用。'
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
      '平底锅少油煎一个鸡蛋（全熟更适合孩子）。',
      '吐司烤 2 分钟至微焦。',
      '按吐司-生菜-番茄片-煎蛋-奶酪-吐司的顺序叠好，对角切开。',
      '搭配一杯温牛奶即可。'
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
      '老豆腐切厚片，煎至两面金黄盛出。',
      '底油下青椒片、胡萝卜片炒 1 分钟。',
      '倒回豆腐，加生抽、蚝油和小半碗水，中火烧 3 分钟入味。',
      '大火收汁撒葱花出锅。'
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
      '紫菜撕小片与虾皮一起放碗底。',
      '锅中水烧开，转小火淋入打散的蛋液成蛋花。',
      '连汤冲入碗中，虾皮自带咸味、基本不用再加盐。',
      '滴两滴香油，撒葱花即成。'
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
      '排骨焯水去浮沫。',
      '排骨加姜片和足量热水，小火煲 40 分钟。',
      '冬瓜去皮切块下锅，再煮 15 分钟至透明。',
      '出锅前加盐调味即可。'
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
      '筒骨焯水洗净。',
      '筒骨、姜片加足量热水，小火煲 1 小时。',
      '下玉米段和胡萝卜块再煲 20 分钟。',
      '加少许盐调味，汤色奶白清甜。'
    ],
    nutrition: { kcal: 120, protein: 7, fat: 7, carbs: 8, calcium: 30, iron: 1.0 },
    tip: '玉米胡萝卜自带清甜，孩子爱喝；骨头汤本身钙不多，补钙还是靠奶类和豆制品。'
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
  }
];

function byId(id) {
  return RECIPES.find((r) => r.id === id);
}

function byType(type) {
  return RECIPES.filter((r) => r.type === type);
}

module.exports = { RECIPES, byId, byType };
