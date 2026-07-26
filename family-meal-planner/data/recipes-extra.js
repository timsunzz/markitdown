/**
 * 扩展菜谱库（自动生成，与 recipes.js 同一份量约定：1 份 = 1 个标准成人份）
 * 由 5 个内容批次合并校验生成；新增食材价格见 prices.js。
 */

const RECIPES = [
  {
    "id": "br11",
    "name": "虾皮鸡蛋羹 + 馒头 + 牛奶",
    "type": "breakfast",
    "spicy": false,
    "tags": [
      "高钙",
      "适合老人",
      "养胃"
    ],
    "time": 15,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "鸡蛋",
        "amount": 2,
        "unit": "个",
        "category": "肉禽蛋"
      },
      {
        "name": "虾皮",
        "amount": 3,
        "unit": "g",
        "category": "水产海鲜"
      },
      {
        "name": "馒头",
        "amount": 80,
        "unit": "g",
        "category": "米面粮油"
      },
      {
        "name": "纯牛奶",
        "amount": 150,
        "unit": "ml",
        "category": "奶品豆制品"
      },
      {
        "name": "小葱",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "香油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "生抽",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "鸡蛋加少许盐打散，兑1.5倍温水搅匀过筛",
      "撒入虾皮，盖保鲜膜扎孔，馒头一起上锅",
      "水开后中火蒸10分钟，馒头蒸热即可",
      "蛋羹淋生抽香油、撒葱花，配热牛奶吃"
    ],
    "nutrition": {
      "kcal": 440,
      "protein": 24,
      "fat": 15,
      "carbs": 50,
      "calcium": 260,
      "iron": 2.8
    },
    "tip": "虾皮和牛奶双重补钙，蛋羹嫩滑好消化，很适合老人和小孩的胃。"
  },
  {
    "id": "br12",
    "name": "酸奶水果燕麦碗 + 水煮蛋",
    "type": "breakfast",
    "spicy": false,
    "tags": [
      "快手",
      "西式",
      "小红书爆款"
    ],
    "time": 10,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "即食燕麦片",
        "amount": 40,
        "unit": "g",
        "category": "米面粮油"
      },
      {
        "name": "酸奶",
        "amount": 150,
        "unit": "ml",
        "category": "奶品豆制品"
      },
      {
        "name": "香蕉",
        "amount": 1,
        "unit": "根",
        "category": "蔬菜水果"
      },
      {
        "name": "混合坚果",
        "amount": 10,
        "unit": "g",
        "category": "调味干货"
      },
      {
        "name": "鸡蛋",
        "amount": 1,
        "unit": "个",
        "category": "肉禽蛋"
      }
    ],
    "steps": [
      "鸡蛋冷水下锅，水开后煮8分钟捞出过凉",
      "燕麦片用少量热水泡软，倒入碗中垫底",
      "淋上酸奶，铺香蕉片，撒混合坚果碎",
      "配水煮蛋一起吃，5分钟端上桌"
    ],
    "nutrition": {
      "kcal": 460,
      "protein": 20,
      "fat": 15,
      "carbs": 60,
      "calcium": 250,
      "iron": 2.5
    },
    "tip": "酸奶选无糖或低糖款更健康，坚果补充好脂肪，饱腹感能撑到中午。"
  },
  {
    "id": "br13",
    "name": "韭菜鸡蛋盒子 + 小米粥",
    "type": "breakfast",
    "spicy": false,
    "tags": [
      "中式",
      "养胃"
    ],
    "time": 30,
    "difficulty": "中等",
    "ingredients": [
      {
        "name": "面粉",
        "amount": 80,
        "unit": "g",
        "category": "米面粮油"
      },
      {
        "name": "韭菜",
        "amount": 80,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "鸡蛋",
        "amount": 1,
        "unit": "个",
        "category": "肉禽蛋"
      },
      {
        "name": "虾皮",
        "amount": 3,
        "unit": "g",
        "category": "水产海鲜"
      },
      {
        "name": "小米",
        "amount": 30,
        "unit": "g",
        "category": "米面粮油"
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食用油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "香油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "小米加水入锅，小火慢熬成粥",
      "面粉加温水和成软面团，醒15分钟",
      "鸡蛋炒碎，拌韭菜末、虾皮、盐和香油",
      "面团擀皮包馅捏边，平底锅少油烙至两面金黄",
      "配小米粥趁热吃"
    ],
    "nutrition": {
      "kcal": 450,
      "protein": 16,
      "fat": 13,
      "carbs": 66,
      "calcium": 180,
      "iron": 3.5
    },
    "tip": "韭菜富含膳食纤维，烙比油炸更清爽；周末可多做几个冷冻备用。"
  },
  {
    "id": "br14",
    "name": "葱花鸡蛋软饼 + 牛奶",
    "type": "breakfast",
    "spicy": false,
    "tags": [
      "快手",
      "儿童友好",
      "成本超低"
    ],
    "time": 12,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "面粉",
        "amount": 60,
        "unit": "g",
        "category": "米面粮油"
      },
      {
        "name": "鸡蛋",
        "amount": 2,
        "unit": "个",
        "category": "肉禽蛋"
      },
      {
        "name": "小葱",
        "amount": 15,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "纯牛奶",
        "amount": 150,
        "unit": "ml",
        "category": "奶品豆制品"
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食用油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "面粉加鸡蛋、盐和适量清水，搅成酸奶状面糊",
      "拌入葱花，静置5分钟更细腻",
      "平底锅刷薄油，倒面糊摊圆，小火烙定型",
      "翻面再烙1分钟至金黄，切块配热牛奶"
    ],
    "nutrition": {
      "kcal": 460,
      "protein": 22,
      "fat": 18,
      "carbs": 52,
      "calcium": 240,
      "iron": 3
    },
    "tip": "面糊稀一点饼才软，孩子好咀嚼；双蛋加牛奶，蛋白质轻松达标。"
  },
  {
    "id": "br15",
    "name": "荠菜馄饨紫菜虾皮汤",
    "type": "breakfast",
    "spicy": false,
    "tags": [
      "快手",
      "中式",
      "养胃"
    ],
    "time": 12,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "速冻荠菜猪肉馄饨",
        "amount": 200,
        "unit": "g",
        "category": "米面粮油"
      },
      {
        "name": "紫菜",
        "amount": 2,
        "unit": "g",
        "category": "调味干货"
      },
      {
        "name": "虾皮",
        "amount": 3,
        "unit": "g",
        "category": "水产海鲜"
      },
      {
        "name": "上海青",
        "amount": 50,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "小葱",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "生抽",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "香油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "碗中放紫菜、虾皮、生抽、香油，冲入热水做汤底",
      "水开下冻馄饨，煮至浮起再点一次冷水",
      "起锅前烫入上海青，一起捞进汤碗",
      "撒葱花即可开吃"
    ],
    "nutrition": {
      "kcal": 430,
      "protein": 18,
      "fat": 14,
      "carbs": 55,
      "calcium": 150,
      "iron": 2.8
    },
    "tip": "紫菜虾皮汤底自带鲜味，不用再加味精，钠摄入更可控。"
  },
  {
    "id": "br16",
    "name": "芝士煎蛋吐司 + 豆浆",
    "type": "breakfast",
    "spicy": false,
    "tags": [
      "快手",
      "西式",
      "高钙"
    ],
    "time": 10,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "全麦吐司",
        "amount": 2,
        "unit": "片",
        "category": "米面粮油"
      },
      {
        "name": "奶酪片",
        "amount": 1,
        "unit": "片",
        "category": "奶品豆制品"
      },
      {
        "name": "鸡蛋",
        "amount": 1,
        "unit": "个",
        "category": "肉禽蛋"
      },
      {
        "name": "生菜",
        "amount": 30,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "番茄",
        "amount": 50,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "豆浆（或黄豆现打）",
        "amount": 250,
        "unit": "ml",
        "category": "奶品豆制品"
      },
      {
        "name": "食用油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "黑胡椒",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "平底锅少油煎一个鸡蛋，撒黑胡椒",
      "吐司干锅烘脆，趁热盖上奶酪片",
      "依次叠生菜、番茄片、煎蛋，盖另一片吐司",
      "对角切开，配热豆浆"
    ],
    "nutrition": {
      "kcal": 420,
      "protein": 22,
      "fat": 16,
      "carbs": 45,
      "calcium": 320,
      "iron": 2.5
    },
    "tip": "奶酪片是补钙利器，配全麦吐司升糖更平稳，上班上学都合适。"
  },
  {
    "id": "br17",
    "name": "南瓜小米粥 + 煎蛋 + 拍黄瓜",
    "type": "breakfast",
    "spicy": false,
    "tags": [
      "养胃",
      "适合老人",
      "粗粮"
    ],
    "time": 25,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "小米",
        "amount": 40,
        "unit": "g",
        "category": "米面粮油"
      },
      {
        "name": "南瓜",
        "amount": 100,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "鸡蛋",
        "amount": 2,
        "unit": "个",
        "category": "肉禽蛋"
      },
      {
        "name": "黄瓜",
        "amount": 100,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蒜",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食用油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "香醋",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "香油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "南瓜去皮切小块，和小米一起加水煮20分钟",
      "黄瓜拍裂切段，加蒜末、盐、醋、香油拌匀",
      "平底锅少油煎两个鸡蛋",
      "粥熬到南瓜软烂即可一起上桌"
    ],
    "nutrition": {
      "kcal": 410,
      "protein": 16,
      "fat": 16,
      "carbs": 48,
      "calcium": 90,
      "iron": 3
    },
    "tip": "南瓜自带甜味不用加糖，小米养胃，早上肠胃负担小。"
  },
  {
    "id": "br18",
    "name": "黄金蛋炒饭 + 纯牛奶",
    "type": "breakfast",
    "spicy": false,
    "tags": [
      "快手",
      "成本超低",
      "儿童友好"
    ],
    "time": 10,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "大米",
        "amount": 70,
        "unit": "g",
        "category": "米面粮油"
      },
      {
        "name": "鸡蛋",
        "amount": 1,
        "unit": "个",
        "category": "肉禽蛋"
      },
      {
        "name": "胡萝卜",
        "amount": 30,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "小葱",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "纯牛奶",
        "amount": 150,
        "unit": "ml",
        "category": "奶品豆制品"
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食用油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "生抽",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "隔夜米饭打散，蛋液倒入拌匀裹住每粒米",
      "热锅下油，倒入米饭中火快炒至粒粒分明",
      "加胡萝卜丁翻炒，用盐和少许生抽调味",
      "撒葱花出锅，配一杯热牛奶"
    ],
    "nutrition": {
      "kcal": 470,
      "protein": 17,
      "fat": 17,
      "carbs": 62,
      "calcium": 210,
      "iron": 2
    },
    "tip": "用隔夜饭消耗剩饭零浪费，蛋液裹饭再炒，少油也能粒粒金黄。"
  },
  {
    "id": "br19",
    "name": "奶香玉米糊 + 水煮蛋 + 蒸紫薯",
    "type": "breakfast",
    "spicy": false,
    "tags": [
      "粗粮",
      "适合老人",
      "快手"
    ],
    "time": 15,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "玉米糊",
        "amount": 40,
        "unit": "g",
        "category": "米面粮油"
      },
      {
        "name": "纯牛奶",
        "amount": 150,
        "unit": "ml",
        "category": "奶品豆制品"
      },
      {
        "name": "鸡蛋",
        "amount": 1,
        "unit": "个",
        "category": "肉禽蛋"
      },
      {
        "name": "紫薯",
        "amount": 120,
        "unit": "g",
        "category": "蔬菜水果"
      }
    ],
    "steps": [
      "紫薯洗净切段，鸡蛋一起上蒸锅蒸12分钟",
      "玉米糊用少量凉水调开避免结块",
      "锅中水烧开，倒入玉米糊边煮边搅2分钟",
      "关火后兑入牛奶搅匀，配蛋和紫薯"
    ],
    "nutrition": {
      "kcal": 440,
      "protein": 15,
      "fat": 10,
      "carbs": 72,
      "calcium": 220,
      "iron": 2.2
    },
    "tip": "粗粮加薯类，膳食纤维丰富促进肠道蠕动，适合久坐人群和老人。"
  },
  {
    "id": "br20",
    "name": "虾仁滑蛋粥 + 蒸红薯",
    "type": "breakfast",
    "spicy": false,
    "tags": [
      "高蛋白",
      "养胃"
    ],
    "time": 30,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "大米",
        "amount": 60,
        "unit": "g",
        "category": "米面粮油"
      },
      {
        "name": "冷冻虾仁",
        "amount": 80,
        "unit": "g",
        "category": "水产海鲜"
      },
      {
        "name": "鸡蛋",
        "amount": 1,
        "unit": "个",
        "category": "肉禽蛋"
      },
      {
        "name": "红薯",
        "amount": 100,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "姜",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "小葱",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "料酒",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "香油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "大米加水煮成稠粥，红薯切块同步上锅蒸熟",
      "虾仁解冻后用料酒和姜丝腌5分钟",
      "粥滚时下虾仁煮2分钟至变色",
      "淋入蛋液搅出蛋花，加盐和香油，撒葱花"
    ],
    "nutrition": {
      "kcal": 460,
      "protein": 24,
      "fat": 8,
      "carbs": 73,
      "calcium": 80,
      "iron": 2
    },
    "tip": "虾仁低脂高蛋白，最后下锅口感才弹嫩；红薯补足碳水更抗饿。"
  },
  {
    "id": "br21",
    "name": "脆底煎饺 + 豆浆 + 凉拌黄瓜",
    "type": "breakfast",
    "spicy": false,
    "tags": [
      "快手",
      "中式"
    ],
    "time": 15,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "速冻猪肉煎饺",
        "amount": 8,
        "unit": "个",
        "category": "米面粮油"
      },
      {
        "name": "豆浆（或黄豆现打）",
        "amount": 250,
        "unit": "ml",
        "category": "奶品豆制品"
      },
      {
        "name": "黄瓜",
        "amount": 100,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蒜",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "食用油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "香醋",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "香油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "平底锅刷油，冻饺子直接码入，小火煎1分钟",
      "倒入没过饺子三分之一的清水，盖盖焖8分钟",
      "水收干后再煎1分钟至底部金黄酥脆",
      "黄瓜拍碎加蒜末、盐、醋、香油拌匀，配热豆浆"
    ],
    "nutrition": {
      "kcal": 450,
      "protein": 20,
      "fat": 19,
      "carbs": 48,
      "calcium": 120,
      "iron": 2.5
    },
    "tip": "水煎法比油炸省油一半，配黄瓜解腻补维C，荤素平衡。"
  },
  {
    "id": "br22",
    "name": "番茄鸡蛋疙瘩汤",
    "type": "breakfast",
    "spicy": false,
    "tags": [
      "养胃",
      "中式",
      "成本超低"
    ],
    "time": 20,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "面粉",
        "amount": 70,
        "unit": "g",
        "category": "米面粮油"
      },
      {
        "name": "番茄",
        "amount": 150,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "鸡蛋",
        "amount": 2,
        "unit": "个",
        "category": "肉禽蛋"
      },
      {
        "name": "上海青",
        "amount": 50,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "小葱",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食用油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "香油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "面粉边滴清水边用筷子搅成小絮状面疙瘩",
      "番茄切块，热油炒出红汤汁，加足量热水",
      "水开后拨入面疙瘩，煮3分钟至浮起",
      "淋蛋液搅出蛋花，放上海青，盐和香油调味"
    ],
    "nutrition": {
      "kcal": 460,
      "protein": 20,
      "fat": 15,
      "carbs": 58,
      "calcium": 110,
      "iron": 3
    },
    "tip": "一锅端的主食蛋白蔬菜全齐，汤汤水水暖胃，冬天早晨首选。"
  },
  {
    "id": "br23",
    "name": "山药肉末粥 + 白灼上海青",
    "type": "breakfast",
    "spicy": false,
    "tags": [
      "养胃",
      "适合老人"
    ],
    "time": 35,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "大米",
        "amount": 60,
        "unit": "g",
        "category": "米面粮油"
      },
      {
        "name": "山药",
        "amount": 100,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "猪肉末",
        "amount": 50,
        "unit": "g",
        "category": "肉禽蛋"
      },
      {
        "name": "上海青",
        "amount": 100,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "姜",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "生抽",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "料酒",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "蚝油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "肉末用生抽料酒姜末抓匀腌10分钟",
      "大米加水煮开，放山药丁小火熬20分钟",
      "下肉末搅散再煮5分钟，加盐调味",
      "上海青沸水烫熟，淋少许蚝油摆盘"
    ],
    "nutrition": {
      "kcal": 420,
      "protein": 16,
      "fat": 12,
      "carbs": 60,
      "calcium": 130,
      "iron": 2.6
    },
    "tip": "山药黏蛋白护胃，肉末提前腌过更嫩滑，粥品早餐也能有优质蛋白。"
  },
  {
    "id": "br24",
    "name": "香煎馒头片 + 煎蛋 + 牛奶",
    "type": "breakfast",
    "spicy": false,
    "tags": [
      "快手",
      "成本超低",
      "儿童友好"
    ],
    "time": 10,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "馒头",
        "amount": 80,
        "unit": "g",
        "category": "米面粮油"
      },
      {
        "name": "鸡蛋",
        "amount": 2,
        "unit": "个",
        "category": "肉禽蛋"
      },
      {
        "name": "纯牛奶",
        "amount": 150,
        "unit": "ml",
        "category": "奶品豆制品"
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食用油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "馒头切1厘米厚片，一个鸡蛋加盐打散",
      "馒头片两面裹满蛋液",
      "平底锅刷油，小火煎至两面金黄",
      "锅边再煎一个鸡蛋，配热牛奶上桌"
    ],
    "nutrition": {
      "kcal": 450,
      "protein": 22,
      "fat": 19,
      "carbs": 45,
      "calcium": 230,
      "iron": 2.4
    },
    "tip": "隔夜馒头裹蛋液煎，外脆里软还不浪费，比油条健康得多。"
  },
  {
    "id": "br25",
    "name": "肉松黄瓜饭团 + 豆浆",
    "type": "breakfast",
    "spicy": false,
    "tags": [
      "带出门",
      "儿童友好",
      "快手"
    ],
    "time": 15,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "大米",
        "amount": 80,
        "unit": "g",
        "category": "米面粮油"
      },
      {
        "name": "肉松",
        "amount": 15,
        "unit": "g",
        "category": "肉禽蛋"
      },
      {
        "name": "黄瓜",
        "amount": 50,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "豆浆（或黄豆现打）",
        "amount": 250,
        "unit": "ml",
        "category": "奶品豆制品"
      },
      {
        "name": "香油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "热米饭加几滴香油和少许盐拌匀放至温热",
      "保鲜膜上铺米饭压平，中间放肉松和黄瓜条",
      "借助保鲜膜卷紧收口，捏成结实的饭团",
      "装袋配瓶装豆浆，出门路上也能吃"
    ],
    "nutrition": {
      "kcal": 450,
      "protein": 20,
      "fat": 10,
      "carbs": 68,
      "calcium": 90,
      "iron": 2.2
    },
    "tip": "赶时间家庭的救星，前晚预约煮饭，早上5分钟就能带走。"
  },
  {
    "id": "br26",
    "name": "花生酱香蕉吐司 + 牛奶",
    "type": "breakfast",
    "spicy": false,
    "tags": [
      "快手",
      "西式",
      "带出门"
    ],
    "time": 5,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "全麦吐司",
        "amount": 2,
        "unit": "片",
        "category": "米面粮油"
      },
      {
        "name": "花生酱",
        "amount": 15,
        "unit": "g",
        "category": "调味干货"
      },
      {
        "name": "香蕉",
        "amount": 1,
        "unit": "根",
        "category": "蔬菜水果"
      },
      {
        "name": "纯牛奶",
        "amount": 200,
        "unit": "ml",
        "category": "奶品豆制品"
      }
    ],
    "steps": [
      "吐司干锅或烤箱烘1分钟至微脆",
      "两片吐司各抹一层薄花生酱",
      "香蕉切片铺在其中一片上，合起对切",
      "配一杯温牛奶即可"
    ],
    "nutrition": {
      "kcal": 470,
      "protein": 17,
      "fat": 15,
      "carbs": 66,
      "calcium": 260,
      "iron": 2
    },
    "tip": "选配料表只有花生的纯花生酱，抹薄薄一层香而不腻热量可控。"
  },
  {
    "id": "br27",
    "name": "酒酿窝蛋小圆子 + 蒸山药",
    "type": "breakfast",
    "spicy": false,
    "tags": [
      "中式",
      "小红书爆款"
    ],
    "time": 15,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "糯米小圆子",
        "amount": 100,
        "unit": "g",
        "category": "米面粮油"
      },
      {
        "name": "酒酿",
        "amount": 120,
        "unit": "g",
        "category": "米面粮油"
      },
      {
        "name": "鸡蛋",
        "amount": 1,
        "unit": "个",
        "category": "肉禽蛋"
      },
      {
        "name": "山药",
        "amount": 100,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "冰糖",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "山药切段上锅蒸12分钟",
      "水开下小圆子，煮至全部浮起",
      "加入酒酿和少许冰糖再煮1分钟",
      "转小火窝入一个鸡蛋，煮3分钟至蛋白凝固"
    ],
    "nutrition": {
      "kcal": 430,
      "protein": 11,
      "fat": 8,
      "carbs": 75,
      "calcium": 60,
      "iron": 1.8
    },
    "tip": "江南人的暖胃早餐，酒酿别久煮以免发酸；冰糖少放甜味更清爽。"
  },
  {
    "id": "br28",
    "name": "葱油拌面 + 溏心蛋 + 烫生菜",
    "type": "breakfast",
    "spicy": false,
    "tags": [
      "快手",
      "中式",
      "成本超低"
    ],
    "time": 15,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "挂面",
        "amount": 80,
        "unit": "g",
        "category": "米面粮油"
      },
      {
        "name": "鸡蛋",
        "amount": 1,
        "unit": "个",
        "category": "肉禽蛋"
      },
      {
        "name": "生菜",
        "amount": 100,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "小葱",
        "amount": 20,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "食用油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "生抽",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "老抽",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "白糖",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "鸡蛋冷水下锅，水开煮6分钟捞出过凉剥壳",
      "小葱段冷油下锅，小火炸至焦黄捞出",
      "葱油中加生抽、老抽、白糖煮开成酱汁",
      "挂面煮熟，顺手烫熟生菜，捞出拌匀酱汁",
      "摆上对半切的溏心蛋"
    ],
    "nutrition": {
      "kcal": 440,
      "protein": 17,
      "fat": 13,
      "carbs": 62,
      "calcium": 70,
      "iron": 2.6
    },
    "tip": "葱油可以周末一次熬一小罐冷藏，工作日早晨拌面3分钟搞定。"
  },
  {
    "id": "br29",
    "name": "家庭版杂粮煎饼 + 豆浆",
    "type": "breakfast",
    "spicy": false,
    "tags": [
      "中式",
      "粗粮"
    ],
    "time": 20,
    "difficulty": "中等",
    "ingredients": [
      {
        "name": "面粉",
        "amount": 50,
        "unit": "g",
        "category": "米面粮油"
      },
      {
        "name": "玉米糊",
        "amount": 20,
        "unit": "g",
        "category": "米面粮油"
      },
      {
        "name": "鸡蛋",
        "amount": 1,
        "unit": "个",
        "category": "肉禽蛋"
      },
      {
        "name": "生菜",
        "amount": 30,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "小葱",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "甜面酱",
        "amount": 15,
        "unit": "g",
        "category": "调味干货"
      },
      {
        "name": "豆浆（或黄豆现打）",
        "amount": 250,
        "unit": "ml",
        "category": "奶品豆制品"
      },
      {
        "name": "食用油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "面粉和玉米糊加水调成能流动的稀面糊",
      "平底锅刷薄油，倒面糊转锅摊成大薄饼",
      "磕入鸡蛋抹匀，撒葱花，定型后翻面",
      "抹甜面酱，铺生菜，卷起切段配豆浆"
    ],
    "nutrition": {
      "kcal": 450,
      "protein": 18,
      "fat": 13,
      "carbs": 62,
      "calcium": 100,
      "iron": 2.8
    },
    "tip": "在家复刻煎饼果子，不放薄脆油脂减半，杂粮糊升糖更平稳。"
  },
  {
    "id": "br30",
    "name": "豆沙包 + 牛奶 + 水煮蛋",
    "type": "breakfast",
    "spicy": false,
    "tags": [
      "快手",
      "儿童友好"
    ],
    "time": 12,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "速冻豆沙包",
        "amount": 2,
        "unit": "个",
        "category": "米面粮油"
      },
      {
        "name": "纯牛奶",
        "amount": 200,
        "unit": "ml",
        "category": "奶品豆制品"
      },
      {
        "name": "鸡蛋",
        "amount": 1,
        "unit": "个",
        "category": "肉禽蛋"
      }
    ],
    "steps": [
      "蒸锅加水，豆沙包不解冻直接上锅",
      "鸡蛋放入下层水中同煮",
      "水开后蒸10分钟，包子蛋同时出锅",
      "牛奶加热至温热，一起上桌"
    ],
    "nutrition": {
      "kcal": 420,
      "protein": 16,
      "fat": 11,
      "carbs": 62,
      "calcium": 240,
      "iron": 2
    },
    "tip": "包子和蛋一锅同蒸省时省火，甜口早餐记得当天别再吃其他甜食。"
  },
  {
    "id": "m24",
    "name": "红烧肉",
    "type": "meat",
    "spicy": false,
    "tags": [
      "硬菜",
      "经典",
      "下饭"
    ],
    "time": 60,
    "difficulty": "中等",
    "ingredients": [
      {
        "name": "五花肉",
        "amount": 90,
        "unit": "g",
        "category": "肉禽蛋"
      },
      {
        "name": "姜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "小葱",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "食用油",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "冰糖",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "生抽",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "老抽",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "料酒",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "八角",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "食盐",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      }
    ],
    "steps": [
      "五花肉切麻将块，冷水下锅加料酒焯水，捞出沥干",
      "少油小火炒化冰糖至枣红色，下肉块翻炒上糖色",
      "加姜片、八角、生抽老抽，倒热水没过肉",
      "小火焖40分钟，大火收汁至浓稠，撒葱花"
    ],
    "nutrition": {
      "kcal": 330,
      "protein": 12,
      "fat": 28,
      "carbs": 7,
      "calcium": 10,
      "iron": 1.5
    },
    "tip": "五花肉脂肪较高，一餐一小碗即可，搭配绿叶菜更均衡。"
  },
  {
    "id": "m25",
    "name": "回锅肉",
    "type": "meat",
    "spicy": true,
    "tags": [
      "川味",
      "下饭神器",
      "经典"
    ],
    "time": 30,
    "difficulty": "中等",
    "ingredients": [
      {
        "name": "五花肉",
        "amount": 80,
        "unit": "g",
        "category": "肉禽蛋"
      },
      {
        "name": "青椒（菜椒不辣）",
        "amount": 60,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蒜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "姜",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "豆瓣酱",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "豆豉",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "生抽",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "白糖",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "料酒",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "食用油",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      }
    ],
    "steps": [
      "五花肉整块加姜片料酒煮20分钟，晾凉切薄片",
      "热锅少油，下肉片小火煸至微卷出油",
      "下豆瓣酱、豆豉、蒜片炒出红油",
      "加青椒块大火翻炒，调生抽和少许糖即可"
    ],
    "nutrition": {
      "kcal": 320,
      "protein": 12,
      "fat": 27,
      "carbs": 8,
      "calcium": 20,
      "iron": 1.6
    },
    "tip": "先煮后煸可逼出部分油脂，煸炒时不必再多放油。"
  },
  {
    "id": "m26",
    "name": "糖醋排骨",
    "type": "meat",
    "spicy": false,
    "tags": [
      "经典",
      "儿童最爱",
      "硬菜"
    ],
    "time": 45,
    "difficulty": "中等",
    "ingredients": [
      {
        "name": "猪肋排",
        "amount": 150,
        "unit": "g",
        "category": "肉禽蛋"
      },
      {
        "name": "姜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "小葱",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "食用油",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "冰糖",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "香醋",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "生抽",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "料酒",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "食盐",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      }
    ],
    "steps": [
      "排骨冷水下锅加姜片料酒焯水，捞出洗净",
      "热油下排骨煎至两面微黄",
      "加冰糖炒出糖色，烹入香醋、生抽，加热水没过",
      "中小火焖30分钟，大火收汁裹亮，撒葱花"
    ],
    "nutrition": {
      "kcal": 310,
      "protein": 18,
      "fat": 20,
      "carbs": 14,
      "calcium": 60,
      "iron": 1.8
    },
    "tip": "糖醋口味含糖较多，儿童喜欢但别天天做，一周一次刚好。"
  },
  {
    "id": "m27",
    "name": "玉米胡萝卜排骨汤",
    "type": "soup",
    "spicy": false,
    "tags": [
      "适合老人",
      "一锅出",
      "家常"
    ],
    "time": 70,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "猪肋排",
        "amount": 120,
        "unit": "g",
        "category": "肉禽蛋"
      },
      {
        "name": "甜玉米",
        "amount": 100,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "胡萝卜",
        "amount": 60,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "姜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "料酒",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "食盐",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      }
    ],
    "steps": [
      "排骨冷水下锅加料酒焯水，撇去浮沫捞出",
      "玉米切段、胡萝卜切滚刀块",
      "全部食材加姜片和足量热水，大火烧开转小火",
      "炖50分钟，出锅前加盐调味即可"
    ],
    "nutrition": {
      "kcal": 280,
      "protein": 17,
      "fat": 16,
      "carbs": 17,
      "calcium": 55,
      "iron": 1.5
    },
    "tip": "汤鲜来自食材本身，起锅再放盐，控钠又不减鲜味。"
  },
  {
    "id": "m28",
    "name": "白萝卜筒骨汤",
    "type": "soup",
    "spicy": false,
    "tags": [
      "适合老人",
      "家常",
      "成本超低"
    ],
    "time": 90,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "猪筒骨",
        "amount": 200,
        "unit": "g",
        "category": "肉禽蛋"
      },
      {
        "name": "白萝卜",
        "amount": 150,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "姜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "小葱",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "料酒",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "食盐",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      }
    ],
    "steps": [
      "筒骨冷水下锅加料酒焯水，冲洗干净",
      "筒骨加姜片和热水，大火烧开转小火炖1小时",
      "下白萝卜块再炖20分钟至透明",
      "加盐调味，撒葱花出锅"
    ],
    "nutrition": {
      "kcal": 220,
      "protein": 14,
      "fat": 15,
      "carbs": 7,
      "calcium": 45,
      "iron": 1.2
    },
    "tip": "骨头汤钙含量有限，吃汤里的肉和萝卜比只喝汤更有营养。"
  },
  {
    "id": "m29",
    "name": "木须肉",
    "type": "meat",
    "spicy": false,
    "tags": [
      "经典",
      "家常",
      "下饭"
    ],
    "time": 20,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "猪里脊肉",
        "amount": 60,
        "unit": "g",
        "category": "肉禽蛋"
      },
      {
        "name": "鸡蛋",
        "amount": 1,
        "unit": "个",
        "category": "肉禽蛋"
      },
      {
        "name": "干木耳",
        "amount": 5,
        "unit": "g",
        "category": "调味干货"
      },
      {
        "name": "黄瓜",
        "amount": 80,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蒜",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "食用油",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "生抽",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "料酒",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "玉米淀粉",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "食盐",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      }
    ],
    "steps": [
      "木耳提前泡发撕小朵，肉切片用料酒淀粉抓匀",
      "鸡蛋打散炒成大块盛出",
      "热油下蒜片和肉片炒至变色",
      "加木耳、黄瓜片大火翻炒，回入鸡蛋调味即可"
    ],
    "nutrition": {
      "kcal": 260,
      "protein": 21,
      "fat": 16,
      "carbs": 8,
      "calcium": 50,
      "iron": 3
    },
    "tip": "木耳富含膳食纤维和铁，配鸡蛋瘦肉，营养搭配很全面。"
  },
  {
    "id": "m30",
    "name": "肉末茄子",
    "type": "meat",
    "spicy": false,
    "tags": [
      "下饭神器",
      "家常",
      "成本超低"
    ],
    "time": 25,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "猪肉末",
        "amount": 50,
        "unit": "g",
        "category": "肉禽蛋"
      },
      {
        "name": "茄子",
        "amount": 150,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蒜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "小葱",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "食用油",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "生抽",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "蚝油",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "白糖",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "食盐",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      }
    ],
    "steps": [
      "茄子切条撒盐腌10分钟，挤干水分",
      "少油下肉末炒散至微黄，加蒜末炒香",
      "下茄条中火翻炒至软塌",
      "调生抽、蚝油、少许糖，撒葱花出锅"
    ],
    "nutrition": {
      "kcal": 250,
      "protein": 12,
      "fat": 17,
      "carbs": 13,
      "calcium": 25,
      "iron": 1.4
    },
    "tip": "茄子先盐腌挤水，能少吸一半油，口感一样软糯入味。"
  },
  {
    "id": "m31",
    "name": "蚂蚁上树",
    "type": "meat",
    "spicy": true,
    "tags": [
      "川味",
      "下饭神器",
      "成本超低"
    ],
    "time": 20,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "猪肉末",
        "amount": 40,
        "unit": "g",
        "category": "肉禽蛋"
      },
      {
        "name": "龙口粉丝",
        "amount": 50,
        "unit": "g",
        "category": "米面粮油"
      },
      {
        "name": "蒜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "姜",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "小葱",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "豆瓣酱",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "生抽",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "食用油",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      }
    ],
    "steps": [
      "粉丝温水泡软剪短，沥干备用",
      "热油下肉末炒散，加姜蒜末和豆瓣酱炒出红油",
      "加半碗热水和生抽烧开，下粉丝翻拌",
      "汤汁收干粉丝透亮时撒葱花出锅"
    ],
    "nutrition": {
      "kcal": 320,
      "protein": 10,
      "fat": 13,
      "carbs": 41,
      "calcium": 20,
      "iron": 1.5
    },
    "tip": "粉丝碳水较高，当主食吃就好，这餐米饭可以少盛半碗。"
  },
  {
    "id": "m32",
    "name": "青椒炒猪肝",
    "type": "meat",
    "spicy": false,
    "tags": [
      "补铁",
      "快手",
      "下饭"
    ],
    "time": 15,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "猪肝",
        "amount": 100,
        "unit": "g",
        "category": "肉禽蛋"
      },
      {
        "name": "青椒（菜椒不辣）",
        "amount": 60,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "姜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蒜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "料酒",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "玉米淀粉",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "生抽",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "香醋",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "食用油",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      }
    ],
    "steps": [
      "猪肝切薄片清水泡10分钟，加料酒淀粉抓匀",
      "热锅热油下猪肝大火快炒至变色盛出",
      "余油下姜蒜和青椒块炒至断生",
      "回入猪肝，烹生抽和几滴醋，翻匀立刻出锅"
    ],
    "nutrition": {
      "kcal": 210,
      "protein": 21,
      "fat": 10,
      "carbs": 8,
      "calcium": 15,
      "iron": 22
    },
    "tip": "猪肝是补铁冠军，儿童孕妇每周吃1-2次即可，不宜过量。"
  },
  {
    "id": "m33",
    "name": "电饭煲腊肠煲仔饭",
    "type": "meat",
    "spicy": false,
    "tags": [
      "一锅出",
      "粤式",
      "小红书爆款"
    ],
    "time": 40,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "腊肠",
        "amount": 25,
        "unit": "g",
        "category": "肉禽蛋"
      },
      {
        "name": "大米",
        "amount": 50,
        "unit": "g",
        "category": "米面粮油"
      },
      {
        "name": "上海青",
        "amount": 60,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "生抽",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "老抽",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "白糖",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "香油",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      }
    ],
    "steps": [
      "大米洗净按平时水量放电饭煲，腊肠切片铺面",
      "按下煮饭键，同时烫熟上海青",
      "生抽老抽白糖香油调成酱汁",
      "饭好后摆上青菜，淋酱汁拌匀焖2分钟"
    ],
    "nutrition": {
      "kcal": 330,
      "protein": 12,
      "fat": 12,
      "carbs": 44,
      "calcium": 40,
      "iron": 1.2
    },
    "tip": "腊肠钠含量高，铺少量提香即可，酱汁也要相应减盐。"
  },
  {
    "id": "m34",
    "name": "香菇蒸肉饼",
    "type": "meat",
    "spicy": false,
    "tags": [
      "适合老人",
      "儿童友好",
      "家常"
    ],
    "time": 25,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "猪肉末",
        "amount": 80,
        "unit": "g",
        "category": "肉禽蛋"
      },
      {
        "name": "干香菇",
        "amount": 10,
        "unit": "g",
        "category": "调味干货"
      },
      {
        "name": "姜",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "小葱",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "生抽",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "料酒",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "玉米淀粉",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "香油",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      }
    ],
    "steps": [
      "干香菇泡发切碎，泡菇水留两勺",
      "肉末加香菇碎、姜末、调料和泡菇水搅上劲",
      "摊入盘中压成1厘米厚的饼",
      "水开上锅蒸12分钟，撒葱花淋香油"
    ],
    "nutrition": {
      "kcal": 250,
      "protein": 15,
      "fat": 19,
      "carbs": 5,
      "calcium": 20,
      "iron": 1.8
    },
    "tip": "蒸制少油软嫩好消化，老人小孩都好嚼，比煎炸更健康。"
  },
  {
    "id": "m35",
    "name": "黑椒牛柳",
    "type": "meat",
    "spicy": false,
    "tags": [
      "高蛋白",
      "下饭",
      "快手"
    ],
    "time": 20,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "牛里脊",
        "amount": 100,
        "unit": "g",
        "category": "肉禽蛋"
      },
      {
        "name": "青椒（菜椒不辣）",
        "amount": 50,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "杏鲍菇",
        "amount": 50,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蒜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "黑胡椒",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "蚝油",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "生抽",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "玉米淀粉",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "食用油",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      }
    ],
    "steps": [
      "牛里脊切条，加生抽淀粉少许油抓匀腌10分钟",
      "热锅热油下牛柳大火快炒至变色盛出",
      "下蒜片、杏鲍菇条、青椒条炒软",
      "回入牛柳，加蚝油和现磨黑胡椒翻匀出锅"
    ],
    "nutrition": {
      "kcal": 230,
      "protein": 23,
      "fat": 11,
      "carbs": 9,
      "calcium": 20,
      "iron": 3
    },
    "tip": "牛里脊高蛋白低脂还补铁，健身增肌人群的优选部位。"
  },
  {
    "id": "m36",
    "name": "番茄肥牛",
    "type": "meat",
    "spicy": false,
    "tags": [
      "小红书爆款",
      "下饭神器",
      "快手"
    ],
    "time": 15,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "肥牛卷",
        "amount": 80,
        "unit": "g",
        "category": "肉禽蛋"
      },
      {
        "name": "番茄",
        "amount": 150,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蒜",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "小葱",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "番茄酱",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "生抽",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "白糖",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "食用油",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "食盐",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      }
    ],
    "steps": [
      "肥牛卷开水烫10秒变色捞出",
      "热油下蒜末和番茄块，炒出浓稠茄汁",
      "加一勺番茄酱和半碗热水烧开",
      "下肥牛煮1分钟，调味撒葱花，连汤汁浇饭绝配"
    ],
    "nutrition": {
      "kcal": 290,
      "protein": 15,
      "fat": 22,
      "carbs": 9,
      "calcium": 20,
      "iron": 2.2
    },
    "tip": "肥牛先焯水去浮油，酸甜汤汁开胃，番茄红素遇油更好吸收。"
  },
  {
    "id": "m37",
    "name": "萝卜炖牛腩",
    "type": "meat",
    "spicy": false,
    "tags": [
      "硬菜",
      "适合老人",
      "经典"
    ],
    "time": 90,
    "difficulty": "中等",
    "ingredients": [
      {
        "name": "牛腩",
        "amount": 120,
        "unit": "g",
        "category": "肉禽蛋"
      },
      {
        "name": "白萝卜",
        "amount": 150,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "姜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "小葱",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "八角",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "料酒",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "生抽",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "老抽",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "食盐",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "食用油",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      }
    ],
    "steps": [
      "牛腩切块冷水下锅加料酒焯水，捞出洗净",
      "热油下姜片八角爆香，下牛腩炒香",
      "加生抽老抽和热水没过，小火炖1小时",
      "下白萝卜块再炖20分钟，加盐收汁撒葱花"
    ],
    "nutrition": {
      "kcal": 300,
      "protein": 22,
      "fat": 21,
      "carbs": 7,
      "calcium": 25,
      "iron": 2.8
    },
    "tip": "牛腩炖到筷子能插透再放萝卜，肉烂萝卜甜，老人也嚼得动。"
  },
  {
    "id": "m38",
    "name": "小炒黄牛肉",
    "type": "meat",
    "spicy": true,
    "tags": [
      "湘味",
      "下饭神器",
      "高蛋白"
    ],
    "time": 15,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "牛里脊",
        "amount": 80,
        "unit": "g",
        "category": "肉禽蛋"
      },
      {
        "name": "螺丝椒",
        "amount": 60,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蒜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "姜",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "干辣椒",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "生抽",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "蚝油",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "玉米淀粉",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "食用油",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      }
    ],
    "steps": [
      "牛肉逆纹切薄片，加生抽淀粉少许油抓匀",
      "热锅热油下牛肉大火滑炒至七成熟盛出",
      "下姜蒜、干辣椒和螺丝椒段炒出虎皮",
      "回入牛肉，加蚝油大火爆炒30秒出锅"
    ],
    "nutrition": {
      "kcal": 220,
      "protein": 19,
      "fat": 13,
      "carbs": 6,
      "calcium": 18,
      "iron": 2.6
    },
    "tip": "牛肉逆着纹路切、大火快炒，口感才嫩，全程别超过2分钟。"
  },
  {
    "id": "m39",
    "name": "西兰花炒牛肉",
    "type": "meat",
    "spicy": false,
    "tags": [
      "低脂",
      "高蛋白",
      "快手"
    ],
    "time": 15,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "牛里脊",
        "amount": 80,
        "unit": "g",
        "category": "肉禽蛋"
      },
      {
        "name": "西兰花",
        "amount": 120,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蒜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蚝油",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "生抽",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "玉米淀粉",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "食用油",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "食盐",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      }
    ],
    "steps": [
      "牛肉切片用生抽淀粉腌10分钟，西兰花掰小朵",
      "西兰花沸水加盐焯1分钟捞出",
      "热油下蒜片和牛肉片炒至变色",
      "下西兰花，加蚝油大火翻炒均匀即可"
    ],
    "nutrition": {
      "kcal": 210,
      "protein": 21,
      "fat": 10,
      "carbs": 9,
      "calcium": 60,
      "iron": 2.5
    },
    "tip": "西兰花维C含量高，能促进牛肉中铁的吸收，是黄金组合。"
  },
  {
    "id": "m40",
    "name": "葱爆羊肉",
    "type": "meat",
    "spicy": false,
    "tags": [
      "经典",
      "高蛋白",
      "快手"
    ],
    "time": 15,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "羊肉片",
        "amount": 120,
        "unit": "g",
        "category": "肉禽蛋"
      },
      {
        "name": "小葱",
        "amount": 50,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "姜",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蒜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "生抽",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "料酒",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "香醋",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "香油",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "食用油",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      }
    ],
    "steps": [
      "羊肉片加料酒生抽抓匀，葱切斜段分葱白葱绿",
      "热锅热油下姜蒜和葱白爆香",
      "下羊肉片大火快炒至变色",
      "下葱绿，锅边烹几滴醋，淋香油翻匀出锅"
    ],
    "nutrition": {
      "kcal": 270,
      "protein": 21,
      "fat": 19,
      "carbs": 4,
      "calcium": 25,
      "iron": 2.5
    },
    "tip": "羊肉温补铁含量高，秋冬吃很合适，大火快炒锁住嫩度。"
  },
  {
    "id": "m41",
    "name": "胡萝卜炖羊肉",
    "type": "meat",
    "spicy": false,
    "tags": [
      "适合老人",
      "硬菜",
      "补铁"
    ],
    "time": 80,
    "difficulty": "中等",
    "ingredients": [
      {
        "name": "羊腿肉",
        "amount": 100,
        "unit": "g",
        "category": "肉禽蛋"
      },
      {
        "name": "胡萝卜",
        "amount": 100,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "姜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "小葱",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "料酒",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "八角",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "生抽",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "食盐",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "食用油",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      }
    ],
    "steps": [
      "羊腿肉切块冷水下锅加料酒焯水，捞出洗净",
      "热油下姜片八角炒香，下羊肉块煸炒",
      "加生抽和热水没过，小火炖50分钟",
      "下胡萝卜块再炖15分钟，加盐撒葱花"
    ],
    "nutrition": {
      "kcal": 260,
      "protein": 20,
      "fat": 17,
      "carbs": 8,
      "calcium": 25,
      "iron": 2.8
    },
    "tip": "胡萝卜的胡萝卜素是脂溶性的，和羊肉同炖吸收率更高。"
  },
  {
    "id": "m42",
    "name": "啤酒卤蛋",
    "type": "meat",
    "spicy": false,
    "tags": [
      "小红书爆款",
      "成本超低",
      "儿童友好"
    ],
    "time": 35,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "鸡蛋",
        "amount": 2,
        "unit": "个",
        "category": "肉禽蛋"
      },
      {
        "name": "啤酒",
        "amount": 1,
        "unit": "个",
        "category": "米面粮油"
      },
      {
        "name": "姜",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "生抽",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "老抽",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "冰糖",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "八角",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      }
    ],
    "steps": [
      "鸡蛋煮8分钟过凉水剥壳，划几刀更入味",
      "整罐啤酒倒锅中，加生抽老抽冰糖八角姜片",
      "放入鸡蛋小火卤15分钟，中途翻面",
      "关火浸泡越久越入味，隔夜风味最佳"
    ],
    "nutrition": {
      "kcal": 190,
      "protein": 13,
      "fat": 11,
      "carbs": 8,
      "calcium": 55,
      "iron": 2
    },
    "tip": "啤酒中酒精煮制时基本挥发，卤蛋当早餐加蛋白质很方便。"
  },
  {
    "id": "m43",
    "name": "丝瓜炒蛋",
    "type": "meat",
    "spicy": false,
    "tags": [
      "家常",
      "快手",
      "适合老人"
    ],
    "time": 12,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "鸡蛋",
        "amount": 2,
        "unit": "个",
        "category": "肉禽蛋"
      },
      {
        "name": "丝瓜",
        "amount": 150,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蒜",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "食用油",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "食盐",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      }
    ],
    "steps": [
      "丝瓜去皮切滚刀块，鸡蛋加少许盐打散",
      "热油炒蛋至凝固盛出",
      "余油下蒜片和丝瓜，中火炒至出汁变软",
      "回入鸡蛋，加盐翻匀即可"
    ],
    "nutrition": {
      "kcal": 210,
      "protein": 14,
      "fat": 15,
      "carbs": 6,
      "calcium": 60,
      "iron": 2
    },
    "tip": "丝瓜水分足热量低，配鸡蛋清爽又有蛋白质，夏天首选。"
  },
  {
    "id": "m44",
    "name": "凉拌皮蛋豆腐",
    "type": "meat",
    "spicy": false,
    "tags": [
      "快手",
      "成本超低",
      "家常"
    ],
    "time": 8,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "皮蛋",
        "amount": 1,
        "unit": "个",
        "category": "肉禽蛋"
      },
      {
        "name": "嫩豆腐",
        "amount": 200,
        "unit": "g",
        "category": "奶品豆制品"
      },
      {
        "name": "小葱",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蒜",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "生抽",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "香醋",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "香油",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "白糖",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      }
    ],
    "steps": [
      "嫩豆腐倒扣入盘，切块保持形状",
      "皮蛋剥壳切瓣，摆在豆腐周围",
      "生抽香醋香油少许糖加蒜末调成料汁",
      "淋上料汁撒葱花，拌开即食"
    ],
    "nutrition": {
      "kcal": 200,
      "protein": 14,
      "fat": 13,
      "carbs": 6,
      "calcium": 130,
      "iron": 2.5
    },
    "tip": "免开火凉菜，豆腐补钙皮蛋提味，夏天没胃口时特别开胃。"
  },
  {
    "id": "m45",
    "name": "虎皮红烧鹌鹑蛋",
    "type": "meat",
    "spicy": false,
    "tags": [
      "小红书爆款",
      "儿童最爱",
      "下饭"
    ],
    "time": 25,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "鹌鹑蛋",
        "amount": 10,
        "unit": "个",
        "category": "肉禽蛋"
      },
      {
        "name": "蒜",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "小葱",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "食用油",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "生抽",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "老抽",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "白糖",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "香醋",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      }
    ],
    "steps": [
      "鹌鹑蛋煮熟剥壳，擦干表面水分",
      "热油小火煎至表皮金黄起虎皮",
      "加生抽老抽糖和小半碗热水烧开",
      "中火收汁裹匀，撒葱花出锅"
    ],
    "nutrition": {
      "kcal": 230,
      "protein": 13,
      "fat": 17,
      "carbs": 7,
      "calcium": 50,
      "iron": 3.2
    },
    "tip": "鹌鹑蛋个头小好入口，铁和卵磷脂丰富，很适合孩子加餐。"
  },
  {
    "id": "m46",
    "name": "肉末烧豆腐",
    "type": "meat",
    "spicy": false,
    "tags": [
      "下饭",
      "家常",
      "成本超低"
    ],
    "time": 20,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "老豆腐",
        "amount": 200,
        "unit": "g",
        "category": "奶品豆制品"
      },
      {
        "name": "猪肉末",
        "amount": 40,
        "unit": "g",
        "category": "肉禽蛋"
      },
      {
        "name": "蒜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "小葱",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "生抽",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "蚝油",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "玉米淀粉",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "食用油",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      }
    ],
    "steps": [
      "老豆腐切块，热油煎至两面金黄盛出",
      "下肉末炒散，加蒜末炒香",
      "加生抽蚝油和半碗热水，放入豆腐焖5分钟",
      "淀粉水勾薄芡，撒葱花出锅"
    ],
    "nutrition": {
      "kcal": 260,
      "protein": 19,
      "fat": 18,
      "carbs": 6,
      "calcium": 250,
      "iron": 2.8
    },
    "tip": "老豆腐钙含量是嫩豆腐的两倍多，加少量肉末鲜味翻倍。"
  },
  {
    "id": "m47",
    "name": "千张炒肉丝",
    "type": "meat",
    "spicy": false,
    "tags": [
      "高蛋白",
      "下饭",
      "快手"
    ],
    "time": 15,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "千张",
        "amount": 100,
        "unit": "g",
        "category": "奶品豆制品"
      },
      {
        "name": "猪里脊肉",
        "amount": 50,
        "unit": "g",
        "category": "肉禽蛋"
      },
      {
        "name": "青椒（菜椒不辣）",
        "amount": 30,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蒜",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "生抽",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "蚝油",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "玉米淀粉",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "食用油",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      }
    ],
    "steps": [
      "千张切细丝开水烫30秒去豆腥，肉切丝上浆",
      "热油下肉丝滑炒至变色盛出",
      "下蒜片和青椒丝炒香，加千张丝翻炒",
      "回入肉丝，调生抽蚝油炒匀即可"
    ],
    "nutrition": {
      "kcal": 300,
      "protein": 28,
      "fat": 18,
      "carbs": 6,
      "calcium": 280,
      "iron": 3.5
    },
    "tip": "千张是豆制品中的蛋白钙双料冠军，一盘顶半杯牛奶的钙。"
  },
  {
    "id": "m48",
    "name": "手撕包菜炒五花肉",
    "type": "meat",
    "spicy": false,
    "tags": [
      "下饭",
      "成本超低",
      "快手"
    ],
    "time": 15,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "五花肉",
        "amount": 50,
        "unit": "g",
        "category": "肉禽蛋"
      },
      {
        "name": "包菜",
        "amount": 200,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蒜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "干辣椒",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "生抽",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "香醋",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "食盐",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      },
      {
        "name": "食用油",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      }
    ],
    "steps": [
      "包菜手撕成大片洗净沥干，五花肉切薄片",
      "少油下五花肉煸出油脂至微焦",
      "下蒜片、干辣椒爆香，倒入包菜大火猛炒",
      "锅边烹醋，加生抽和盐炒至断生出锅"
    ],
    "nutrition": {
      "kcal": 240,
      "protein": 10,
      "fat": 19,
      "carbs": 9,
      "calcium": 55,
      "iron": 1.2
    },
    "tip": "用五花肉自身油脂炒菜可少放油，包菜断生就出锅更爽脆。"
  },
  {
    "id": "m49",
    "name": "午餐肉厚蛋烧",
    "type": "meat",
    "spicy": false,
    "tags": [
      "儿童最爱",
      "快手",
      "小红书爆款"
    ],
    "time": 12,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "午餐肉",
        "amount": 50,
        "unit": "g",
        "category": "肉禽蛋"
      },
      {
        "name": "鸡蛋",
        "amount": 2,
        "unit": "个",
        "category": "肉禽蛋"
      },
      {
        "name": "小葱",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "食用油",
        "pantry": true,
        "amount": 0,
        "unit": "适量",
        "category": "调味干货"
      }
    ],
    "steps": [
      "午餐肉切小丁，鸡蛋加葱花打散",
      "平底锅薄油，倒入一半蛋液铺午餐肉丁",
      "半凝固时从一端卷起推到锅边",
      "倒剩余蛋液接着卷，成型后切段装盘"
    ],
    "nutrition": {
      "kcal": 300,
      "protein": 17,
      "fat": 24,
      "carbs": 4,
      "calcium": 60,
      "iron": 2.2
    },
    "tip": "午餐肉钠和脂肪偏高，蛋液里不用再加盐，偶尔解馋即可。"
  },
  {
    "id": "m50",
    "name": "柠檬手撕鸡",
    "type": "meat",
    "spicy": false,
    "tags": [
      "小红书爆款",
      "高蛋白",
      "低脂"
    ],
    "time": 25,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "鸡腿肉",
        "amount": 150,
        "unit": "g",
        "category": "肉禽蛋"
      },
      {
        "name": "柠檬",
        "amount": 1,
        "unit": "个",
        "category": "蔬菜水果"
      },
      {
        "name": "黄瓜",
        "amount": 80,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "小葱",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蒜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "姜",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "生抽",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "香醋",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "白糖",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "香油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "鸡腿肉冷水下锅，加姜片料酒煮15分钟，捞出过凉水",
      "放凉后手撕成粗丝，黄瓜拍碎切段垫底",
      "柠檬半个挤汁半个切片，与蒜末、生抽、醋、糖、香油调成料汁",
      "料汁淋在鸡丝上拌匀，撒葱花冷藏10分钟更入味"
    ],
    "nutrition": {
      "kcal": 245,
      "protein": 27,
      "fat": 12,
      "carbs": 6,
      "calcium": 30,
      "iron": 1.4
    },
    "tip": "去皮鸡腿肉脂肪减半，柠檬维C还能促进铁吸收，减脂期也能放心吃。"
  },
  {
    "id": "m51",
    "name": "蒜香黄油虾",
    "type": "meat",
    "spicy": false,
    "tags": [
      "小红书爆款",
      "高蛋白",
      "快手"
    ],
    "time": 15,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "基围虾",
        "amount": 200,
        "unit": "g",
        "category": "水产海鲜"
      },
      {
        "name": "黄油",
        "amount": 10,
        "unit": "g",
        "category": "奶品豆制品"
      },
      {
        "name": "蒜",
        "amount": 20,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "小葱",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "料酒",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "生抽",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "黑胡椒",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "基围虾剪须开背去虾线，用料酒腌5分钟",
      "小火融化黄油，下蒜末炒出香味",
      "转中火下虾，两面煎至变红卷曲",
      "沿锅边淋生抽，撒黑胡椒和葱花即可"
    ],
    "nutrition": {
      "kcal": 230,
      "protein": 28,
      "fat": 11,
      "carbs": 4,
      "calcium": 90,
      "iron": 1.8
    },
    "tip": "虾是优质蛋白低脂代表，黄油只需10克提香，孩子老人都爱吃。"
  },
  {
    "id": "m52",
    "name": "香煎三文鱼",
    "type": "meat",
    "spicy": false,
    "tags": [
      "DHA",
      "无刺",
      "快手"
    ],
    "time": 15,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "三文鱼",
        "amount": 130,
        "unit": "g",
        "category": "水产海鲜"
      },
      {
        "name": "西兰花",
        "amount": 100,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "柠檬",
        "amount": 1,
        "unit": "个",
        "category": "蔬菜水果"
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "黑胡椒",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食用油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "三文鱼擦干水分，两面抹盐和黑胡椒腌10分钟",
      "西兰花焯水1分钟摆盘备用",
      "少油中火，鱼皮朝下煎3分钟，翻面再煎2分钟",
      "挤上柠檬汁，配西兰花上桌"
    ],
    "nutrition": {
      "kcal": 290,
      "protein": 27,
      "fat": 18,
      "carbs": 5,
      "calcium": 50,
      "iron": 1.2
    },
    "tip": "三文鱼DHA含量高且完全无刺，是给孩子补脑最省心的鱼，每周吃1-2次。"
  },
  {
    "id": "m53",
    "name": "清蒸黄花鱼",
    "type": "meat",
    "spicy": false,
    "tags": [
      "DHA",
      "低脂",
      "家常"
    ],
    "time": 20,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "黄花鱼",
        "amount": 300,
        "unit": "g",
        "category": "水产海鲜"
      },
      {
        "name": "姜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "小葱",
        "amount": 15,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "料酒",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "蒸鱼豉油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食用油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "黄花鱼两面划刀，抹料酒，肚里塞姜片葱段",
      "水开后上锅大火蒸8分钟，倒掉盘中腥水",
      "铺上葱丝，淋蒸鱼豉油",
      "烧一勺热油浇在葱丝上激出香味"
    ],
    "nutrition": {
      "kcal": 210,
      "protein": 28,
      "fat": 9,
      "carbs": 2,
      "calcium": 55,
      "iron": 1
    },
    "tip": "黄花鱼刺少肉嫩富含DHA，给孩子吃时选中段大块肉，更放心。"
  },
  {
    "id": "m54",
    "name": "鲫鱼豆腐汤",
    "type": "soup",
    "spicy": false,
    "tags": [
      "适合老人",
      "高蛋白",
      "家常"
    ],
    "time": 30,
    "difficulty": "中等",
    "ingredients": [
      {
        "name": "鲫鱼",
        "amount": 250,
        "unit": "g",
        "category": "水产海鲜"
      },
      {
        "name": "嫩豆腐",
        "amount": 150,
        "unit": "g",
        "category": "奶品豆制品"
      },
      {
        "name": "姜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "小葱",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "料酒",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食用油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "鲫鱼擦干水分，热油两面煎至微黄",
      "加开水没过鱼身，放姜片料酒，大火煮10分钟至汤发白",
      "下豆腐块再煮8分钟",
      "加盐调味，撒葱花出锅"
    ],
    "nutrition": {
      "kcal": 250,
      "protein": 26,
      "fat": 14,
      "carbs": 4,
      "calcium": 180,
      "iron": 1.8
    },
    "tip": "鱼加豆腐钙和蛋白互补，汤鲜刺多，给孩子喝汤吃豆腐即可。"
  },
  {
    "id": "m55",
    "name": "蛤蜊蒸蛋",
    "type": "meat",
    "spicy": false,
    "tags": [
      "儿童最爱",
      "高蛋白",
      "低脂"
    ],
    "time": 20,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "蛤蜊",
        "amount": 150,
        "unit": "g",
        "category": "水产海鲜"
      },
      {
        "name": "鸡蛋",
        "amount": 2,
        "unit": "个",
        "category": "肉禽蛋"
      },
      {
        "name": "小葱",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "料酒",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "蒸鱼豉油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "香油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "蛤蜊吐沙后加料酒煮至开口，摆入深盘",
      "煮蛤蜊的汤放凉滤净，与蛋液按1.5:1混合",
      "蛋液过筛倒入盘中，盖保鲜膜扎孔",
      "水开中火蒸10分钟，淋豉油香油撒葱花"
    ],
    "nutrition": {
      "kcal": 195,
      "protein": 20,
      "fat": 10,
      "carbs": 5,
      "calcium": 100,
      "iron": 5
    },
    "tip": "蛤蜊含铁含锌高，配上嫩滑蒸蛋，是给孩子补铁补锌的一流搭配。"
  },
  {
    "id": "m56",
    "name": "辣炒蛤蜊",
    "type": "meat",
    "spicy": true,
    "tags": [
      "下饭神器",
      "快手",
      "成本超低"
    ],
    "time": 15,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "蛤蜊",
        "amount": 350,
        "unit": "g",
        "category": "水产海鲜"
      },
      {
        "name": "蒜",
        "amount": 15,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "姜",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "小葱",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "干辣椒",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "豆瓣酱",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "料酒",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "白糖",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "蛤蜊盐水浸泡2小时充分吐沙，冲洗干净",
      "热油爆香蒜姜、干辣椒和豆瓣酱",
      "大火下蛤蜊翻炒，烹入料酒加少许糖",
      "炒至全部开口，撒葱段立刻出锅"
    ],
    "nutrition": {
      "kcal": 185,
      "protein": 19,
      "fat": 8,
      "carbs": 8,
      "calcium": 130,
      "iron": 7
    },
    "tip": "蛤蜊热量极低铁含量高，大火快炒开口即出锅，久炒肉会变老。"
  },
  {
    "id": "m57",
    "name": "白灼基围虾",
    "type": "meat",
    "spicy": false,
    "tags": [
      "粤式",
      "低脂",
      "宴客拿得出手"
    ],
    "time": 10,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "基围虾",
        "amount": 250,
        "unit": "g",
        "category": "水产海鲜"
      },
      {
        "name": "姜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "小葱",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "料酒",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "生抽",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "香油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "锅中水烧开，加姜片、葱结、料酒",
      "下基围虾煮2分钟，变红弯曲立即捞出",
      "虾过一遍冰水，肉质更弹",
      "姜丝加生抽香油调蘸汁，蘸食"
    ],
    "nutrition": {
      "kcal": 190,
      "protein": 30,
      "fat": 5,
      "carbs": 3,
      "calcium": 110,
      "iron": 2
    },
    "tip": "白灼最大程度保留虾的优质蛋白和鲜味，几乎零额外油脂，减脂首选。"
  },
  {
    "id": "m58",
    "name": "番茄龙利鱼",
    "type": "meat",
    "spicy": false,
    "tags": [
      "儿童最爱",
      "无刺",
      "下饭"
    ],
    "time": 20,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "龙利鱼柳",
        "amount": 150,
        "unit": "g",
        "category": "水产海鲜"
      },
      {
        "name": "番茄",
        "amount": 200,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蒜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "小葱",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "玉米淀粉",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "料酒",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "番茄酱",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "白糖",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "龙利鱼切块，用料酒、盐、淀粉抓匀腌10分钟",
      "番茄去皮切丁，蒜末炒香后下番茄炒出沙",
      "加一小碗水和番茄酱煮开，下鱼块",
      "中火煮4分钟，加盐糖调味，撒葱花"
    ],
    "nutrition": {
      "kcal": 205,
      "protein": 24,
      "fat": 7,
      "carbs": 12,
      "calcium": 40,
      "iron": 1.2
    },
    "tip": "龙利鱼完全无刺无腥味，酸甜番茄汤汁拌饭，挑食孩子也能吃一大碗。"
  },
  {
    "id": "m59",
    "name": "干煎带鱼",
    "type": "meat",
    "spicy": false,
    "tags": [
      "经典",
      "家常",
      "下饭"
    ],
    "time": 20,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "带鱼",
        "amount": 200,
        "unit": "g",
        "category": "水产海鲜"
      },
      {
        "name": "姜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "料酒",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "玉米淀粉",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食用油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "花椒粉",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "带鱼段用姜片、料酒、盐腌15分钟",
      "擦干水分，两面薄薄拍一层淀粉",
      "中小火煎至两面金黄酥脆",
      "出锅撒少许盐和花椒粉"
    ],
    "nutrition": {
      "kcal": 260,
      "protein": 24,
      "fat": 16,
      "carbs": 6,
      "calcium": 40,
      "iron": 1.5
    },
    "tip": "带鱼DHA和不饱和脂肪酸丰富，中间只有一根大骨，给孩子挑刺很方便。"
  },
  {
    "id": "m60",
    "name": "红烧鸡翅",
    "type": "meat",
    "spicy": false,
    "tags": [
      "儿童最爱",
      "下饭",
      "家常"
    ],
    "time": 25,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "鸡翅中",
        "amount": 200,
        "unit": "g",
        "category": "肉禽蛋"
      },
      {
        "name": "姜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "小葱",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "冰糖",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "生抽",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "老抽",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "料酒",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "八角",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "鸡翅两面划刀，冷水下锅焯水后擦干",
      "少油小火炒化冰糖，下鸡翅裹上糖色",
      "加姜片、八角、料酒、生抽老抽和热水没过",
      "中火焖15分钟，大火收汁撒葱花"
    ],
    "nutrition": {
      "kcal": 300,
      "protein": 25,
      "fat": 19,
      "carbs": 8,
      "calcium": 15,
      "iron": 1.3
    },
    "tip": "鸡翅蛋白质优质易嚼，收汁前撇去浮油可减少三分之一脂肪摄入。"
  },
  {
    "id": "m61",
    "name": "黑椒煎鸡胸",
    "type": "meat",
    "spicy": false,
    "tags": [
      "低脂",
      "高蛋白",
      "快手"
    ],
    "time": 15,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "鸡胸肉",
        "amount": 150,
        "unit": "g",
        "category": "肉禽蛋"
      },
      {
        "name": "西兰花",
        "amount": 100,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蒜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "黑胡椒",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "生抽",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "料酒",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "蚝油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食用油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "鸡胸片成两大片，刀背拍松，用料酒生抽黑胡椒腌15分钟",
      "西兰花焯水1分钟垫盘",
      "少油中火每面煎3分钟，加蒜末再煎1分钟",
      "淋少许蚝油汁，切条摆在西兰花上"
    ],
    "nutrition": {
      "kcal": 220,
      "protein": 32,
      "fat": 7,
      "carbs": 8,
      "calcium": 45,
      "iron": 1.5
    },
    "tip": "鸡胸肉是性价比最高的低脂高蛋白食材，拍松再腌就不柴。"
  },
  {
    "id": "m62",
    "name": "酱香焖鸭腿",
    "type": "meat",
    "spicy": false,
    "tags": [
      "硬菜",
      "下饭",
      "宴客拿得出手"
    ],
    "time": 45,
    "difficulty": "中等",
    "ingredients": [
      {
        "name": "鸭腿",
        "amount": 220,
        "unit": "g",
        "category": "肉禽蛋"
      },
      {
        "name": "姜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蒜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "小葱",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "冰糖",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "生抽",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "老抽",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "料酒",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "八角",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "鸭腿冷水下锅焯水去腥，擦干",
      "不加油干煸鸭腿至两面微黄逼出鸭油",
      "下姜蒜、八角、冰糖，烹料酒和生抽老抽",
      "加热水没过，小火焖35分钟收汁撒葱花"
    ],
    "nutrition": {
      "kcal": 310,
      "protein": 26,
      "fat": 20,
      "carbs": 7,
      "calcium": 15,
      "iron": 3
    },
    "tip": "鸭肉铁含量高于鸡肉，干煸逼出皮下油脂后再焖，更香也更低脂。"
  },
  {
    "id": "m63",
    "name": "韭菜炒鱿鱼",
    "type": "meat",
    "spicy": false,
    "tags": [
      "快手",
      "高蛋白",
      "家常"
    ],
    "time": 15,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "鱿鱼",
        "amount": 180,
        "unit": "g",
        "category": "水产海鲜"
      },
      {
        "name": "韭菜",
        "amount": 100,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "姜",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蒜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "料酒",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "生抽",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "蚝油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食用油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "鱿鱼打花刀切块，沸水加料酒烫10秒卷起即捞",
      "韭菜切段，梗叶分开放",
      "热油爆香姜蒜，大火下鱿鱼和韭菜梗炒半分钟",
      "下韭菜叶，加生抽蚝油翻匀立刻出锅"
    ],
    "nutrition": {
      "kcal": 190,
      "protein": 26,
      "fat": 6,
      "carbs": 8,
      "calcium": 70,
      "iron": 1.6
    },
    "tip": "鱿鱼高蛋白低脂肪还富含牛磺酸，焯烫加爆炒全程别超过2分钟才嫩。"
  },
  {
    "id": "m64",
    "name": "蒜蓉粉丝蒸扇贝",
    "type": "meat",
    "spicy": false,
    "tags": [
      "宴客拿得出手",
      "小红书爆款",
      "粤式"
    ],
    "time": 20,
    "difficulty": "中等",
    "ingredients": [
      {
        "name": "扇贝",
        "amount": 4,
        "unit": "个",
        "category": "水产海鲜"
      },
      {
        "name": "龙口粉丝",
        "amount": 30,
        "unit": "g",
        "category": "米面粮油"
      },
      {
        "name": "蒜",
        "amount": 25,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "小葱",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蒸鱼豉油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食用油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "料酒",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "扇贝刷净撬开，贝肉去内脏冲洗，壳留用",
      "粉丝泡软剪短垫在壳上，放回贝肉",
      "蒜末小火炸至微黄，加豉油料酒调成蒜蓉酱铺上",
      "水开大火蒸6分钟，撒葱花再淋一勺热油"
    ],
    "nutrition": {
      "kcal": 200,
      "protein": 18,
      "fat": 7,
      "carbs": 17,
      "calcium": 90,
      "iron": 2.2
    },
    "tip": "扇贝柱是优质蛋白，锌含量突出，蒸制做法保留鲜味又不额外增脂。"
  },
  {
    "id": "m65",
    "name": "土豆焖鸡腿",
    "type": "meat",
    "spicy": false,
    "tags": [
      "一锅出",
      "下饭",
      "家常"
    ],
    "time": 30,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "鸡腿肉",
        "amount": 150,
        "unit": "g",
        "category": "肉禽蛋"
      },
      {
        "name": "土豆",
        "amount": 150,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "胡萝卜",
        "amount": 50,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "姜",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蒜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "生抽",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "老抽",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "料酒",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "白糖",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "鸡腿肉切块焯水，土豆胡萝卜切滚刀块",
      "热油爆香姜蒜，下鸡块炒至表面微黄",
      "加料酒、生抽老抽、少许糖和热水没过食材",
      "下土豆胡萝卜，中小火焖15分钟收汁"
    ],
    "nutrition": {
      "kcal": 290,
      "protein": 24,
      "fat": 13,
      "carbs": 22,
      "calcium": 25,
      "iron": 1.6
    },
    "tip": "一锅出有荤有素有主食，土豆吸满汤汁，晚餐可适当减少米饭量。"
  },
  {
    "id": "m66",
    "name": "西兰花炒虾仁",
    "type": "meat",
    "spicy": false,
    "tags": [
      "低脂",
      "高蛋白",
      "快手"
    ],
    "time": 15,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "冷冻虾仁",
        "amount": 150,
        "unit": "g",
        "category": "水产海鲜"
      },
      {
        "name": "西兰花",
        "amount": 150,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "胡萝卜",
        "amount": 30,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蒜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "料酒",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "玉米淀粉",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "蚝油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "虾仁解冻擦干，用料酒、淀粉抓匀腌10分钟",
      "西兰花和胡萝卜片焯水1分钟捞出",
      "热油下蒜片和虾仁，炒至变红",
      "倒入蔬菜，加盐和蚝油大火翻匀"
    ],
    "nutrition": {
      "kcal": 185,
      "protein": 25,
      "fat": 6,
      "carbs": 10,
      "calcium": 100,
      "iron": 1.8
    },
    "tip": "虾仁加西兰花是经典减脂组合，蛋白质高热量低，晚餐吃也无负担。"
  },
  {
    "id": "m67",
    "name": "油焖大虾",
    "type": "meat",
    "spicy": false,
    "tags": [
      "经典",
      "宴客拿得出手",
      "儿童最爱"
    ],
    "time": 20,
    "difficulty": "中等",
    "ingredients": [
      {
        "name": "基围虾",
        "amount": 250,
        "unit": "g",
        "category": "水产海鲜"
      },
      {
        "name": "姜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "小葱",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "番茄酱",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "白糖",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "料酒",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "生抽",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食用油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "大虾剪须开背去虾线，擦干水分",
      "热油下虾煎至两面变红，压虾头煸出红油",
      "下姜末，加料酒、番茄酱、生抽、糖和小半碗水",
      "中火焖3分钟收浓汤汁，撒葱花"
    ],
    "nutrition": {
      "kcal": 235,
      "protein": 28,
      "fat": 10,
      "carbs": 9,
      "calcium": 105,
      "iron": 2
    },
    "tip": "虾头煸出的虾油富含虾青素，酸甜汁裹住虾肉，孩子剥壳吃得停不下来。"
  },
  {
    "id": "m68",
    "name": "豆豉蒸鸡",
    "type": "meat",
    "spicy": false,
    "tags": [
      "粤式",
      "低脂",
      "适合老人"
    ],
    "time": 25,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "鸡腿肉",
        "amount": 180,
        "unit": "g",
        "category": "肉禽蛋"
      },
      {
        "name": "干香菇",
        "amount": 10,
        "unit": "g",
        "category": "调味干货"
      },
      {
        "name": "姜",
        "amount": 8,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "小葱",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "豆豉",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "生抽",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "料酒",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "玉米淀粉",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "香油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "鸡腿肉切块，干香菇泡发切片",
      "加剁碎的豆豉、姜丝、生抽、料酒、淀粉抓匀腌20分钟",
      "平铺盘中，水开大火蒸15分钟",
      "淋少许香油，撒葱花即可"
    ],
    "nutrition": {
      "kcal": 240,
      "protein": 27,
      "fat": 12,
      "carbs": 6,
      "calcium": 25,
      "iron": 1.8
    },
    "tip": "蒸制不额外用油，鸡肉嫩滑豉香浓，牙口不好的老人也容易嚼。"
  },
  {
    "id": "m69",
    "name": "水煮龙利鱼片",
    "type": "meat",
    "spicy": true,
    "tags": [
      "川味",
      "下饭神器",
      "无刺"
    ],
    "time": 25,
    "difficulty": "中等",
    "ingredients": [
      {
        "name": "龙利鱼柳",
        "amount": 180,
        "unit": "g",
        "category": "水产海鲜"
      },
      {
        "name": "绿豆芽",
        "amount": 100,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "生菜",
        "amount": 80,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蒜",
        "amount": 15,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "豆瓣酱",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "干辣椒",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "花椒粉",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "玉米淀粉",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "料酒",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食用油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "鱼柳斜刀切片，用料酒、淀粉抓匀腌10分钟",
      "豆芽生菜烫熟垫碗底",
      "炒香豆瓣酱加水煮开，逐片下鱼片煮2分钟",
      "连汤倒入碗中，铺蒜末干辣椒花椒粉，浇热油"
    ],
    "nutrition": {
      "kcal": 230,
      "protein": 25,
      "fat": 11,
      "carbs": 9,
      "calcium": 60,
      "iron": 1.6
    },
    "tip": "用无刺龙利鱼做水煮鱼不用担心卡刺，麻辣过瘾但记得少喝红油汤。"
  },
  {
    "id": "m70",
    "name": "冬瓜老鸭汤",
    "type": "soup",
    "spicy": false,
    "tags": [
      "适合老人",
      "低脂",
      "家常"
    ],
    "time": 60,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "鸭腿",
        "amount": 200,
        "unit": "g",
        "category": "肉禽蛋"
      },
      {
        "name": "冬瓜",
        "amount": 200,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "姜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "小葱",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "料酒",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "鸭腿斩块冷水下锅，加料酒焯水洗净",
      "鸭块加姜片和足量热水，大火烧开转小火炖40分钟",
      "下冬瓜块再炖10分钟",
      "撇去浮油，加盐调味撒葱花"
    ],
    "nutrition": {
      "kcal": 240,
      "protein": 24,
      "fat": 14,
      "carbs": 5,
      "calcium": 30,
      "iron": 2.6
    },
    "tip": "鸭肉配冬瓜清润不腻，喝前撇净浮油，适合老人和夏天没胃口时。"
  },
  {
    "id": "m71",
    "name": "凉拌鸡丝",
    "type": "meat",
    "spicy": false,
    "tags": [
      "低脂",
      "高蛋白",
      "快手"
    ],
    "time": 20,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "鸡胸肉",
        "amount": 130,
        "unit": "g",
        "category": "肉禽蛋"
      },
      {
        "name": "黄瓜",
        "amount": 100,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "胡萝卜",
        "amount": 30,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蒜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "姜",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "生抽",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "香醋",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "白糖",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "香油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "鸡胸冷水下锅加姜片，小火煮12分钟关火焖5分钟",
      "捞出放凉撕成细丝",
      "黄瓜胡萝卜切丝，与鸡丝同放大碗",
      "蒜末、生抽、醋、糖、香油调汁拌匀"
    ],
    "nutrition": {
      "kcal": 190,
      "protein": 28,
      "fat": 6,
      "carbs": 8,
      "calcium": 35,
      "iron": 1.2
    },
    "tip": "水煮加焖的鸡胸不柴不腻，一盘热量不到200千卡，蛋白却近30克。"
  },
  {
    "id": "m72",
    "name": "虾仁豆腐煲",
    "type": "meat",
    "spicy": false,
    "tags": [
      "高蛋白",
      "适合老人",
      "一锅出"
    ],
    "time": 20,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "冷冻虾仁",
        "amount": 100,
        "unit": "g",
        "category": "水产海鲜"
      },
      {
        "name": "嫩豆腐",
        "amount": 200,
        "unit": "g",
        "category": "奶品豆制品"
      },
      {
        "name": "金针菇",
        "amount": 50,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "小葱",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "姜",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蚝油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "生抽",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "玉米淀粉",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食用油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "虾仁解冻擦干，豆腐切块，金针菇去根撕开",
      "热油爆香姜末，下虾仁炒至变色",
      "加水煮开，下豆腐和金针菇煮5分钟",
      "加蚝油生抽调味，水淀粉勾薄芡撒葱花"
    ],
    "nutrition": {
      "kcal": 210,
      "protein": 24,
      "fat": 9,
      "carbs": 10,
      "calcium": 200,
      "iron": 2.5
    },
    "tip": "虾仁和豆腐双重优质蛋白，一煲补钙近200毫克，软嫩适合老人孩子。"
  },
  {
    "id": "m73",
    "name": "宫保虾球",
    "type": "meat",
    "spicy": true,
    "tags": [
      "川味",
      "下饭神器",
      "高蛋白"
    ],
    "time": 20,
    "difficulty": "中等",
    "ingredients": [
      {
        "name": "冷冻虾仁",
        "amount": 150,
        "unit": "g",
        "category": "水产海鲜"
      },
      {
        "name": "黄瓜",
        "amount": 80,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "花生米",
        "amount": 20,
        "unit": "g",
        "category": "调味干货"
      },
      {
        "name": "蒜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "小葱",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "干辣椒",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "生抽",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "香醋",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "白糖",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "玉米淀粉",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "料酒",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "虾仁用料酒、淀粉腌10分钟，黄瓜切丁",
      "生抽、醋、糖、淀粉加两勺水调宫保汁",
      "小火炒香花生米盛出，爆香干辣椒蒜末葱段",
      "大火下虾仁炒变色，倒黄瓜和料汁，收浓后拌入花生"
    ],
    "nutrition": {
      "kcal": 260,
      "protein": 26,
      "fat": 12,
      "carbs": 14,
      "calcium": 90,
      "iron": 2
    },
    "tip": "用虾仁替换鸡丁脂肪更低，酸甜微辣超下饭，花生最后放才够脆。"
  },
  {
    "id": "m74",
    "name": "山药炖鸡汤",
    "type": "soup",
    "spicy": false,
    "tags": [
      "适合老人",
      "家常",
      "高蛋白"
    ],
    "time": 50,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "鸡腿肉",
        "amount": 180,
        "unit": "g",
        "category": "肉禽蛋"
      },
      {
        "name": "山药",
        "amount": 150,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "胡萝卜",
        "amount": 50,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "姜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "小葱",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "料酒",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "鸡腿肉切块，冷水下锅加料酒焯水洗净",
      "鸡块加姜片和热水，大火烧开转小火炖30分钟",
      "山药胡萝卜切滚刀块下锅再炖15分钟",
      "加盐调味，撒葱花出锅"
    ],
    "nutrition": {
      "kcal": 265,
      "protein": 25,
      "fat": 12,
      "carbs": 18,
      "calcium": 30,
      "iron": 1.5
    },
    "tip": "山药健脾易消化，和鸡汤同炖汤清味鲜，适合老人孩子换季喝。"
  },
  {
    "id": "m75",
    "name": "杏鲍菇炒鸡丁",
    "type": "meat",
    "spicy": false,
    "tags": [
      "家常",
      "快手",
      "成本超低"
    ],
    "time": 15,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "鸡胸肉",
        "amount": 130,
        "unit": "g",
        "category": "肉禽蛋"
      },
      {
        "name": "杏鲍菇",
        "amount": 120,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "青椒（菜椒不辣）",
        "amount": 50,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蒜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "生抽",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "蚝油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "玉米淀粉",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "料酒",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食用油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "鸡胸切丁，用料酒、生抽、淀粉抓匀腌10分钟",
      "杏鲍菇切丁干煸出水分盛出",
      "热油爆香蒜末，下鸡丁炒至变白",
      "倒回杏鲍菇和青椒丁，加蚝油大火翻匀"
    ],
    "nutrition": {
      "kcal": 210,
      "protein": 28,
      "fat": 7,
      "carbs": 12,
      "calcium": 20,
      "iron": 1.3
    },
    "tip": "杏鲍菇口感像肉、膳食纤维高，和鸡丁同炒荤素平衡，成本不到十元。"
  },
  {
    "id": "v18",
    "name": "清炒菠菜",
    "type": "veg",
    "spicy": false,
    "tags": [
      "绿叶菜",
      "快手",
      "成本超低"
    ],
    "time": 8,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "菠菜",
        "amount": 250,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蒜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食用油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "菠菜洗净切段，沸水焯10秒捞出沥干",
      "热锅下油，爆香蒜末",
      "倒入菠菜大火快炒30秒",
      "加盐翻匀立即出锅"
    ],
    "nutrition": {
      "kcal": 95,
      "protein": 6,
      "fat": 6,
      "carbs": 8,
      "calcium": 140,
      "iron": 4.5
    },
    "tip": "菠菜先焯水去草酸，钙和铁更好吸收，大火快炒保住叶酸"
  },
  {
    "id": "v19",
    "name": "姜汁菠菜",
    "type": "veg",
    "spicy": false,
    "tags": [
      "凉拌",
      "绿叶菜",
      "低油"
    ],
    "time": 10,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "菠菜",
        "amount": 250,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "姜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "生抽",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "香醋",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "香油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "菠菜洗净，沸水焯30秒捞出过凉",
      "挤干水分切段装盘",
      "姜磨成蓉，加生抽、香醋、盐调成姜汁",
      "淋上姜汁和几滴香油拌匀"
    ],
    "nutrition": {
      "kcal": 70,
      "protein": 6,
      "fat": 3,
      "carbs": 8,
      "calcium": 140,
      "iron": 4.5
    },
    "tip": "凉拌少油更清爽，姜汁开胃暖胃，适合夏天没胃口时吃"
  },
  {
    "id": "v20",
    "name": "蒜蓉空心菜",
    "type": "veg",
    "spicy": false,
    "tags": [
      "绿叶菜",
      "快手",
      "时令"
    ],
    "time": 8,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "空心菜",
        "amount": 250,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蒜",
        "amount": 15,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食用油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "空心菜择洗干净，切成长段",
      "热锅下油，爆香一半蒜末",
      "大火下空心菜快炒1分钟",
      "加盐和剩余蒜末翻匀出锅"
    ],
    "nutrition": {
      "kcal": 90,
      "protein": 5,
      "fat": 6,
      "carbs": 7,
      "calcium": 180,
      "iron": 2.5
    },
    "tip": "空心菜含钙量在绿叶菜里名列前茅，大火快炒口感最脆嫩"
  },
  {
    "id": "v21",
    "name": "白灼芥蓝",
    "type": "veg",
    "spicy": false,
    "tags": [
      "绿叶菜",
      "补钙",
      "低油"
    ],
    "time": 10,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "芥蓝",
        "amount": 250,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蒜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蒸鱼豉油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "白糖",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食用油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "芥蓝削去老皮洗净",
      "水开加少许油盐，下芥蓝烫1分半捞出摆盘",
      "蒸鱼豉油加少许白糖和热水调匀淋上",
      "热油浇在蒜末上激出香味"
    ],
    "nutrition": {
      "kcal": 95,
      "protein": 5,
      "fat": 6,
      "carbs": 8,
      "calcium": 200,
      "iron": 2
    },
    "tip": "芥蓝钙含量高且草酸低，是补钙性价比很高的深色蔬菜"
  },
  {
    "id": "v22",
    "name": "蒜蓉苋菜",
    "type": "veg",
    "spicy": false,
    "tags": [
      "绿叶菜",
      "补钙",
      "时令"
    ],
    "time": 8,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "苋菜",
        "amount": 250,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蒜",
        "amount": 15,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食用油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "苋菜择洗干净，沥干水分",
      "热锅下油，爆香蒜末",
      "下苋菜大火炒至出红汤变软",
      "加盐翻匀出锅"
    ],
    "nutrition": {
      "kcal": 85,
      "protein": 6,
      "fat": 6,
      "carbs": 7,
      "calcium": 280,
      "iron": 5
    },
    "tip": "苋菜钙铁双高，红色汤汁拌饭孩子也爱吃，夏季应季更便宜"
  },
  {
    "id": "v23",
    "name": "香菇青菜",
    "type": "veg",
    "spicy": false,
    "tags": [
      "绿叶菜",
      "下饭",
      "适合老人"
    ],
    "time": 15,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "上海青",
        "amount": 250,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "干香菇",
        "amount": 8,
        "unit": "g",
        "category": "调味干货"
      },
      {
        "name": "蒜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蚝油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "玉米淀粉",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食用油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "干香菇提前泡发切片，泡菇水留用",
      "上海青对半切开，焯水后摆盘",
      "爆香蒜末，下香菇炒香，加泡菇水和蚝油",
      "淀粉水勾薄芡，浇在青菜上"
    ],
    "nutrition": {
      "kcal": 100,
      "protein": 5,
      "fat": 6,
      "carbs": 10,
      "calcium": 150,
      "iron": 2
    },
    "tip": "干香菇的鲜味素比鲜菇更浓，泡菇水别倒，用来做芡汁提鲜"
  },
  {
    "id": "v24",
    "name": "韭菜炒香干",
    "type": "veg",
    "spicy": false,
    "tags": [
      "植物蛋白",
      "补钙",
      "下饭"
    ],
    "time": 10,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "韭菜",
        "amount": 150,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "香干",
        "amount": 100,
        "unit": "g",
        "category": "奶品豆制品"
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "生抽",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食用油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "韭菜洗净切段，香干切条",
      "热油先下香干煸至微黄",
      "加生抽炒匀，下韭菜段",
      "大火炒30秒，加盐出锅"
    ],
    "nutrition": {
      "kcal": 185,
      "protein": 15,
      "fat": 11,
      "carbs": 8,
      "calcium": 320,
      "iron": 4
    },
    "tip": "香干补钙补蛋白，配深绿色韭菜，一道菜兼顾钙和膳食纤维"
  },
  {
    "id": "v25",
    "name": "韭菜炒绿豆芽",
    "type": "veg",
    "spicy": false,
    "tags": [
      "绿叶菜",
      "成本超低",
      "快手"
    ],
    "time": 8,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "绿豆芽",
        "amount": 200,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "韭菜",
        "amount": 100,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "香醋",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食用油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "豆芽洗净沥干，韭菜切段",
      "热锅下油，大火下豆芽炒1分钟",
      "沿锅边淋少许香醋，下韭菜",
      "加盐快速翻匀出锅"
    ],
    "nutrition": {
      "kcal": 85,
      "protein": 5,
      "fat": 5,
      "carbs": 8,
      "calcium": 70,
      "iron": 1.8
    },
    "tip": "豆芽热量低水分足，全程大火快炒才脆，醋能保住维生素C"
  },
  {
    "id": "v26",
    "name": "清炒菜心",
    "type": "veg",
    "spicy": false,
    "tags": [
      "绿叶菜",
      "快手",
      "低油"
    ],
    "time": 8,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "菜心",
        "amount": 250,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蒜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食用油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "菜心洗净，粗梗斜刀切开",
      "热锅下油爆香蒜片",
      "先下菜梗炒半分钟，再下菜叶",
      "加盐大火翻炒至断生出锅"
    ],
    "nutrition": {
      "kcal": 85,
      "protein": 4,
      "fat": 6,
      "carbs": 6,
      "calcium": 120,
      "iron": 1.5
    },
    "tip": "菜梗和菜叶分先后下锅，熟度一致，老人孩子都嚼得动"
  },
  {
    "id": "v27",
    "name": "虾皮小白菜",
    "type": "veg",
    "spicy": false,
    "tags": [
      "补钙",
      "绿叶菜",
      "成本超低"
    ],
    "time": 8,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "小白菜",
        "amount": 250,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "虾皮",
        "amount": 5,
        "unit": "g",
        "category": "调味干货"
      },
      {
        "name": "蒜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食用油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "小白菜洗净切段，虾皮冲洗一下",
      "热油爆香蒜末和虾皮",
      "下小白菜大火翻炒至变软",
      "尝味后少量加盐出锅"
    ],
    "nutrition": {
      "kcal": 80,
      "protein": 6,
      "fat": 5,
      "carbs": 5,
      "calcium": 260,
      "iron": 2
    },
    "tip": "虾皮自带咸鲜和钙，盐要少放，这道菜是平价补钙组合"
  },
  {
    "id": "v28",
    "name": "菠菜豆腐汤",
    "type": "soup",
    "spicy": false,
    "tags": [
      "补钙",
      "适合老人",
      "低油"
    ],
    "time": 15,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "菠菜",
        "amount": 100,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "嫩豆腐",
        "amount": 150,
        "unit": "g",
        "category": "奶品豆制品"
      },
      {
        "name": "姜",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "香油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "菠菜焯水10秒捞出切段",
      "嫩豆腐切小块，姜切丝",
      "水开下姜丝和豆腐，中火煮3分钟",
      "放菠菜煮半分钟，加盐和几滴香油"
    ],
    "nutrition": {
      "kcal": 115,
      "protein": 10,
      "fat": 6,
      "carbs": 6,
      "calcium": 200,
      "iron": 3
    },
    "tip": "菠菜先焯水去草酸，就不影响豆腐里钙的吸收，可放心同吃"
  },
  {
    "id": "v29",
    "name": "小葱拌豆腐",
    "type": "veg",
    "spicy": false,
    "tags": [
      "凉拌",
      "补钙",
      "快手"
    ],
    "time": 5,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "嫩豆腐",
        "amount": 200,
        "unit": "g",
        "category": "奶品豆制品"
      },
      {
        "name": "小葱",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "虾皮",
        "amount": 3,
        "unit": "g",
        "category": "调味干货"
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "生抽",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "香油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "嫩豆腐用温开水冲一下，切块装盘",
      "小葱切碎，虾皮微波或干锅烘香",
      "撒上葱花虾皮，淋生抽和香油",
      "吃前拌匀即可"
    ],
    "nutrition": {
      "kcal": 145,
      "protein": 11,
      "fat": 9,
      "carbs": 5,
      "calcium": 180,
      "iron": 2
    },
    "tip": "5分钟上桌的优质蛋白菜，加一撮烘香的虾皮鲜味翻倍"
  },
  {
    "id": "v30",
    "name": "凉拌腐竹芹菜",
    "type": "veg",
    "spicy": false,
    "tags": [
      "凉拌",
      "植物蛋白",
      "小红书爆款"
    ],
    "time": 20,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "腐竹",
        "amount": 25,
        "unit": "g",
        "category": "奶品豆制品"
      },
      {
        "name": "芹菜",
        "amount": 80,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "胡萝卜",
        "amount": 30,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蒜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "生抽",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "香醋",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "白糖",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "香油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "腐竹提前用温水泡软，切段",
      "腐竹、芹菜段、胡萝卜丝分别焯水过凉",
      "蒜末加生抽、香醋、白糖、香油调汁",
      "全部食材倒入料汁拌匀，冷藏更入味"
    ],
    "nutrition": {
      "kcal": 175,
      "protein": 13,
      "fat": 10,
      "carbs": 9,
      "calcium": 90,
      "iron": 3
    },
    "tip": "腐竹是浓缩的大豆蛋白，一小把顶半块豆腐，凉拌低油更健康"
  },
  {
    "id": "v31",
    "name": "青椒炒豆干",
    "type": "veg",
    "spicy": false,
    "tags": [
      "植物蛋白",
      "下饭",
      "补钙"
    ],
    "time": 10,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "香干",
        "amount": 120,
        "unit": "g",
        "category": "奶品豆制品"
      },
      {
        "name": "青椒（菜椒不辣）",
        "amount": 100,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蒜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "生抽",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食用油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "香干切片，青椒去籽切块",
      "热油爆香蒜片，下香干煸出焦边",
      "下青椒翻炒1分钟",
      "加生抽和少许盐炒匀出锅"
    ],
    "nutrition": {
      "kcal": 195,
      "protein": 17,
      "fat": 12,
      "carbs": 8,
      "calcium": 350,
      "iron": 4.5
    },
    "tip": "菜椒不辣维C高，配豆干蛋白钙都够，是素菜里的营养主力"
  },
  {
    "id": "v32",
    "name": "素麻婆豆腐",
    "type": "veg",
    "spicy": true,
    "tags": [
      "下饭",
      "植物蛋白"
    ],
    "time": 15,
    "difficulty": "中等",
    "ingredients": [
      {
        "name": "嫩豆腐",
        "amount": 250,
        "unit": "g",
        "category": "奶品豆制品"
      },
      {
        "name": "蒜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "小葱",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "豆瓣酱",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "花椒粉",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "生抽",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "玉米淀粉",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食用油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "豆腐切块，淡盐水焯1分钟捞出",
      "小火用油炒香豆瓣酱和蒜末出红油",
      "加半碗水和生抽，轻推入豆腐烧3分钟",
      "淀粉水分两次勾芡收浓",
      "撒花椒粉和葱花出锅"
    ],
    "nutrition": {
      "kcal": 190,
      "protein": 13,
      "fat": 12,
      "carbs": 9,
      "calcium": 190,
      "iron": 3
    },
    "tip": "素版少了肉末但蛋白不缺，豆瓣酱偏咸，无需再额外加盐"
  },
  {
    "id": "v33",
    "name": "凉拌莴笋丝",
    "type": "veg",
    "spicy": false,
    "tags": [
      "凉拌",
      "爽口",
      "低油"
    ],
    "time": 10,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "莴笋",
        "amount": 250,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蒜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "白糖",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "香醋",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "香油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "莴笋去皮切细丝",
      "加少许盐抓匀腌5分钟，挤去水分",
      "加蒜末、白糖、香醋、香油拌匀",
      "装盘即食，冷藏后更脆"
    ],
    "nutrition": {
      "kcal": 55,
      "protein": 2,
      "fat": 3,
      "carbs": 7,
      "calcium": 40,
      "iron": 1
    },
    "tip": "莴笋含钾高热量低，先盐腌挤水口感更脆，适合控体重人群"
  },
  {
    "id": "v34",
    "name": "糖醋凉拌藕片",
    "type": "veg",
    "spicy": false,
    "tags": [
      "凉拌",
      "爽口",
      "时令"
    ],
    "time": 15,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "藕",
        "amount": 200,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蒜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "小葱",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "香醋",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "白糖",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "生抽",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "香油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "藕去皮切薄片，清水泡去淀粉",
      "沸水焯1分钟，捞出过凉水",
      "香醋、白糖、生抽、蒜末调成糖醋汁",
      "藕片拌入料汁，撒葱花点香油"
    ],
    "nutrition": {
      "kcal": 150,
      "protein": 3,
      "fat": 3,
      "carbs": 30,
      "calcium": 45,
      "iron": 1.2
    },
    "tip": "藕淀粉含量高，这道菜可替代部分主食，吃了记得米饭减量"
  },
  {
    "id": "v35",
    "name": "蒜泥秋葵",
    "type": "veg",
    "spicy": false,
    "tags": [
      "凉拌",
      "小红书爆款",
      "低油"
    ],
    "time": 10,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "秋葵",
        "amount": 200,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蒜",
        "amount": 15,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蒸鱼豉油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "香油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食用油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "秋葵洗净，沸水加几滴油焯2分钟",
      "过凉水后去蒂，对半切开摆盘",
      "蒜末加蒸鱼豉油、香油调成料汁",
      "淋在秋葵上即可"
    ],
    "nutrition": {
      "kcal": 75,
      "protein": 4,
      "fat": 4,
      "carbs": 9,
      "calcium": 90,
      "iron": 1.2
    },
    "tip": "秋葵的黏液是可溶性膳食纤维，整根焯熟再切才不流失"
  },
  {
    "id": "v36",
    "name": "白灼芦笋",
    "type": "veg",
    "spicy": false,
    "tags": [
      "小红书爆款",
      "低油",
      "快手"
    ],
    "time": 8,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "芦笋",
        "amount": 200,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蒜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蒸鱼豉油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食用油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "芦笋切去老根，削掉根部老皮",
      "沸水加少许盐油，烫1分半捞出摆盘",
      "淋上蒸鱼豉油，铺蒜末",
      "烧一勺热油浇在蒜末上"
    ],
    "nutrition": {
      "kcal": 70,
      "protein": 4,
      "fat": 5,
      "carbs": 6,
      "calcium": 25,
      "iron": 1.5
    },
    "tip": "芦笋叶酸含量突出，备孕和孕期家庭可常做，白灼最保营养"
  },
  {
    "id": "v37",
    "name": "干锅花菜",
    "type": "veg",
    "spicy": true,
    "tags": [
      "下饭",
      "成本超低"
    ],
    "time": 15,
    "difficulty": "中等",
    "ingredients": [
      {
        "name": "花菜",
        "amount": 300,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蒜",
        "amount": 15,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "小葱",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "干辣椒",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "豆豉",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "生抽",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "白糖",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食用油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "花菜手掰小朵，洗净沥干",
      "中火干煸花菜至边缘微焦，盛出",
      "热油爆香蒜片、干辣椒和豆豉",
      "倒回花菜，加生抽和少许糖翻匀",
      "撒葱段出锅"
    ],
    "nutrition": {
      "kcal": 130,
      "protein": 5,
      "fat": 8,
      "carbs": 12,
      "calcium": 60,
      "iron": 1.5
    },
    "tip": "先干煸出焦香就能少放油，比饭店干锅版热量低一半"
  },
  {
    "id": "v38",
    "name": "上汤娃娃菜",
    "type": "veg",
    "spicy": false,
    "tags": [
      "适合老人",
      "补钙",
      "低油"
    ],
    "time": 15,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "娃娃菜",
        "amount": 300,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蒜",
        "amount": 20,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "虾皮",
        "amount": 5,
        "unit": "g",
        "category": "调味干货"
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食用油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "娃娃菜洗净竖切成条",
      "小火把蒜瓣煎至金黄",
      "加开水和虾皮煮出奶白汤",
      "下娃娃菜煮3分钟至软，加盐调味"
    ],
    "nutrition": {
      "kcal": 95,
      "protein": 5,
      "fat": 6,
      "carbs": 8,
      "calcium": 150,
      "iron": 1.2
    },
    "tip": "娃娃菜软嫩带甜，连汤带菜适合老人，虾皮提鲜还补钙"
  },
  {
    "id": "v39",
    "name": "荷兰豆炒口蘑",
    "type": "veg",
    "spicy": false,
    "tags": [
      "快手",
      "爽口",
      "低油"
    ],
    "time": 10,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "荷兰豆",
        "amount": 150,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "口蘑",
        "amount": 100,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蒜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "蚝油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食用油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "荷兰豆撕去老筋，口蘑切片",
      "荷兰豆焯水30秒捞出",
      "热油爆香蒜片，下口蘑炒出水分",
      "下荷兰豆，加蚝油和盐炒匀"
    ],
    "nutrition": {
      "kcal": 105,
      "protein": 6,
      "fat": 6,
      "carbs": 9,
      "calcium": 55,
      "iron": 1.5
    },
    "tip": "荷兰豆一定焯熟再炒，生的含皂素易刺激肠胃"
  },
  {
    "id": "v40",
    "name": "清炒丝瓜",
    "type": "veg",
    "spicy": false,
    "tags": [
      "快手",
      "适合老人",
      "时令"
    ],
    "time": 8,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "丝瓜",
        "amount": 300,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蒜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食用油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "丝瓜去皮切滚刀块",
      "热锅下油爆香蒜片",
      "下丝瓜中大火炒至微出汁",
      "加盐翻匀即可出锅"
    ],
    "nutrition": {
      "kcal": 75,
      "protein": 2,
      "fat": 5,
      "carbs": 8,
      "calcium": 30,
      "iron": 0.8
    },
    "tip": "丝瓜自带清甜和水分，不用加水焖，软滑口感很适合老人"
  },
  {
    "id": "v41",
    "name": "冬瓜虾皮汤",
    "type": "soup",
    "spicy": false,
    "tags": [
      "补钙",
      "低油",
      "成本超低"
    ],
    "time": 15,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "冬瓜",
        "amount": 300,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "虾皮",
        "amount": 5,
        "unit": "g",
        "category": "调味干货"
      },
      {
        "name": "小葱",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "香油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "冬瓜去皮去瓤，切薄片",
      "水开下冬瓜和虾皮，中火煮5分钟",
      "煮至冬瓜透明变软",
      "加少许盐，撒葱花点香油"
    ],
    "nutrition": {
      "kcal": 55,
      "protein": 4,
      "fat": 3,
      "carbs": 6,
      "calcium": 170,
      "iron": 1
    },
    "tip": "冬瓜利水低卡，虾皮提供钙和鲜味，晚餐喝一碗轻负担"
  },
  {
    "id": "v42",
    "name": "红烧白萝卜",
    "type": "veg",
    "spicy": false,
    "tags": [
      "下饭",
      "成本超低",
      "适合老人"
    ],
    "time": 20,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "白萝卜",
        "amount": 350,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "小葱",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "生抽",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "老抽",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "白糖",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "八角",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食用油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "白萝卜去皮切滚刀块",
      "热油下萝卜煎至边缘微黄",
      "加生抽、老抽、糖、一颗八角和热水",
      "中小火焖12分钟收汁，撒葱花"
    ],
    "nutrition": {
      "kcal": 100,
      "protein": 3,
      "fat": 5,
      "carbs": 13,
      "calcium": 60,
      "iron": 0.8
    },
    "tip": "萝卜炖软入味像吃肉，价格便宜纤维足，冬季应季更甜"
  },
  {
    "id": "v43",
    "name": "蒜蓉蒸金针菇",
    "type": "veg",
    "spicy": false,
    "tags": [
      "小红书爆款",
      "低油",
      "快手"
    ],
    "time": 15,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "金针菇",
        "amount": 200,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蒜",
        "amount": 25,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "小葱",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蒸鱼豉油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食用油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "金针菇去根撕开，铺在盘底",
      "小火把一半蒜末炒金黄，混入生蒜末",
      "蒜蓉铺在金针菇上，水开蒸8分钟",
      "淋蒸鱼豉油，撒葱花，浇一勺热油"
    ],
    "nutrition": {
      "kcal": 95,
      "protein": 5,
      "fat": 6,
      "carbs": 9,
      "calcium": 20,
      "iron": 1.2
    },
    "tip": "蒸比蒜蓉粉丝版少了精制碳水，金针菇纤维多，饱腹又低卡"
  },
  {
    "id": "v44",
    "name": "蚝油双菇",
    "type": "veg",
    "spicy": false,
    "tags": [
      "下饭",
      "快手"
    ],
    "time": 10,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "平菇",
        "amount": 150,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蟹味菇",
        "amount": 100,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蒜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蚝油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "生抽",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食用油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "平菇手撕成条，蟹味菇去根散开",
      "热油爆香蒜末，下双菇中大火炒",
      "炒出的水分收干后加蚝油生抽",
      "翻匀收汁出锅"
    ],
    "nutrition": {
      "kcal": 100,
      "protein": 6,
      "fat": 6,
      "carbs": 9,
      "calcium": 15,
      "iron": 1.5
    },
    "tip": "菌菇鲜味物质丰富，少盐也够味，是减盐饮食的好帮手"
  },
  {
    "id": "v45",
    "name": "清蒸贝贝南瓜",
    "type": "veg",
    "spicy": false,
    "tags": [
      "儿童友好",
      "低油",
      "适合老人"
    ],
    "time": 20,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "贝贝南瓜",
        "amount": 250,
        "unit": "g",
        "category": "蔬菜水果"
      }
    ],
    "steps": [
      "贝贝南瓜洗净外皮，对半切开去籽",
      "切成月牙块，带皮摆盘",
      "水开上锅蒸15分钟，筷子能穿透即可"
    ],
    "nutrition": {
      "kcal": 120,
      "protein": 3,
      "fat": 1,
      "carbs": 28,
      "calcium": 40,
      "iron": 1
    },
    "tip": "贝贝南瓜粉糯香甜零调味，胡萝卜素丰富，可替代部分主食"
  },
  {
    "id": "v46",
    "name": "玉米黄瓜炒三丁",
    "type": "veg",
    "spicy": false,
    "tags": [
      "儿童友好",
      "快手",
      "爽口"
    ],
    "time": 10,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "甜玉米",
        "amount": 100,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "黄瓜",
        "amount": 100,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "胡萝卜",
        "amount": 80,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食用油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "玉米粒剥好，黄瓜胡萝卜切小丁",
      "玉米和胡萝卜丁焯水1分钟",
      "热油下三丁大火翻炒1分钟",
      "加盐调味出锅"
    ],
    "nutrition": {
      "kcal": 120,
      "protein": 4,
      "fat": 5,
      "carbs": 18,
      "calcium": 30,
      "iron": 1
    },
    "tip": "颜色鲜艳最抓孩子眼球，玉米的叶黄素对眼睛发育友好"
  },
  {
    "id": "v47",
    "name": "番茄烧菜花",
    "type": "veg",
    "spicy": false,
    "tags": [
      "下饭",
      "儿童友好",
      "低油"
    ],
    "time": 15,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "花菜",
        "amount": 250,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "番茄",
        "amount": 150,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蒜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "番茄酱",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "白糖",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食用油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "花菜掰小朵焯水2分钟，番茄切丁",
      "热油爆香蒜末，下番茄炒出沙",
      "加一勺番茄酱和少许糖盐",
      "倒入花菜翻匀，焖2分钟收汁"
    ],
    "nutrition": {
      "kcal": 110,
      "protein": 5,
      "fat": 5,
      "carbs": 14,
      "calcium": 55,
      "iron": 1.5
    },
    "tip": "酸甜浓汁拌饭孩子爱吃，番茄红素经加热更易吸收"
  },
  {
    "id": "v48",
    "name": "蒜苔炒木耳",
    "type": "veg",
    "spicy": false,
    "tags": [
      "深色蔬菜",
      "下饭"
    ],
    "time": 12,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "蒜苔",
        "amount": 150,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "干木耳",
        "amount": 8,
        "unit": "g",
        "category": "调味干货"
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "生抽",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食用油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "干木耳冷水泡发，撕小朵焯水1分钟",
      "蒜苔洗净切段",
      "热油下蒜苔炒2分钟至断生",
      "下木耳，加生抽和盐炒匀"
    ],
    "nutrition": {
      "kcal": 100,
      "protein": 4,
      "fat": 6,
      "carbs": 10,
      "calcium": 60,
      "iron": 3
    },
    "tip": "木耳铁含量高又富含可溶纤维，泡发别超过4小时更安全"
  },
  {
    "id": "v49",
    "name": "蒜蓉蒸茄子",
    "type": "veg",
    "spicy": false,
    "tags": [
      "低油",
      "小红书爆款",
      "下饭"
    ],
    "time": 20,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "茄子",
        "amount": 300,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蒜",
        "amount": 25,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "小葱",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "生抽",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "蒸鱼豉油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "香油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "茄子洗净切长条，水开蒸10分钟",
      "倒掉盘中蒸出的水",
      "蒜末加生抽、蒸鱼豉油、香油调汁",
      "料汁淋在茄子上，撒葱花"
    ],
    "nutrition": {
      "kcal": 85,
      "protein": 3,
      "fat": 4,
      "carbs": 12,
      "calcium": 30,
      "iron": 1
    },
    "tip": "茄子像海绵吸油，蒸制做法比红烧版能省下大半的油"
  },
  {
    "id": "v50",
    "name": "青椒土豆片",
    "type": "veg",
    "spicy": false,
    "tags": [
      "下饭",
      "成本超低",
      "快手"
    ],
    "time": 12,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "土豆",
        "amount": 200,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "青椒（菜椒不辣）",
        "amount": 80,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "蒜",
        "amount": 10,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "香醋",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "食用油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "土豆去皮切薄片，清水冲去淀粉",
      "青椒去籽切片",
      "热油爆香蒜片，下土豆片炒至半透明",
      "下青椒，淋少许香醋，加盐炒匀"
    ],
    "nutrition": {
      "kcal": 150,
      "protein": 4,
      "fat": 6,
      "carbs": 22,
      "calcium": 25,
      "iron": 1
    },
    "tip": "土豆是主食型蔬菜，吃这道菜时米饭减掉小半碗更均衡"
  },
  {
    "id": "s09",
    "name": "番茄蛋花汤",
    "type": "soup",
    "spicy": false,
    "tags": [
      "开胃",
      "快手",
      "成本超低"
    ],
    "time": 8,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "番茄",
        "amount": 150,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "鸡蛋",
        "amount": 1,
        "unit": "个",
        "category": "肉禽蛋"
      },
      {
        "name": "小葱",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "食用油",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      },
      {
        "name": "香油",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      }
    ],
    "steps": [
      "番茄去皮切小块，鸡蛋打散备用",
      "热锅少油炒番茄至出沙，加水煮开",
      "转小火淋入蛋液，凝固后轻轻推散",
      "加盐调味，滴香油撒葱花即可"
    ],
    "nutrition": {
      "kcal": 105,
      "protein": 7,
      "fat": 6,
      "carbs": 6,
      "calcium": 35,
      "iron": 1.2
    },
    "tip": "番茄炒出沙后番茄红素更易吸收，餐前喝一碗还能帮助控制食量。"
  },
  {
    "id": "s10",
    "name": "紫菜豆腐汤",
    "type": "soup",
    "spicy": false,
    "tags": [
      "补钙",
      "快手",
      "清爽"
    ],
    "time": 10,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "干紫菜",
        "amount": 3,
        "unit": "g",
        "category": "调味干货"
      },
      {
        "name": "嫩豆腐",
        "amount": 150,
        "unit": "g",
        "category": "奶品豆制品"
      },
      {
        "name": "虾皮",
        "amount": 3,
        "unit": "g",
        "category": "调味干货"
      },
      {
        "name": "小葱",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      },
      {
        "name": "香油",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      }
    ],
    "steps": [
      "嫩豆腐切小块，紫菜撕小片",
      "水烧开后下豆腐块煮 3 分钟",
      "放入紫菜和虾皮再煮 1 分钟",
      "少盐调味，滴香油撒葱花出锅"
    ],
    "nutrition": {
      "kcal": 85,
      "protein": 8,
      "fat": 4,
      "carbs": 4,
      "calcium": 180,
      "iron": 2
    },
    "tip": "虾皮和紫菜本身带咸鲜味，盐要少放，适合需要控钠又想补钙的家庭。"
  },
  {
    "id": "s11",
    "name": "黄瓜蛋花汤",
    "type": "soup",
    "spicy": false,
    "tags": [
      "清爽",
      "快手",
      "成本超低"
    ],
    "time": 8,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "黄瓜",
        "amount": 120,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "鸡蛋",
        "amount": 1,
        "unit": "个",
        "category": "肉禽蛋"
      },
      {
        "name": "虾皮",
        "amount": 2,
        "unit": "g",
        "category": "调味干货"
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      },
      {
        "name": "香油",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      }
    ],
    "steps": [
      "黄瓜洗净切薄片，鸡蛋打散",
      "水烧开后下黄瓜片和虾皮煮 1 分钟",
      "淋入蛋液成蛋花，关火",
      "加盐、滴香油即可"
    ],
    "nutrition": {
      "kcal": 80,
      "protein": 7,
      "fat": 5,
      "carbs": 3,
      "calcium": 60,
      "iron": 1
    },
    "tip": "黄瓜下锅时间短口感更脆嫩，夏天喝清爽补水，热量很低。"
  },
  {
    "id": "s13",
    "name": "金针菇肉丝汤",
    "type": "soup",
    "spicy": false,
    "tags": [
      "开胃",
      "快手"
    ],
    "time": 10,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "金针菇",
        "amount": 100,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "猪里脊肉",
        "amount": 40,
        "unit": "g",
        "category": "肉禽蛋"
      },
      {
        "name": "姜",
        "amount": 3,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "小葱",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "玉米淀粉",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      },
      {
        "name": "料酒",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      }
    ],
    "steps": [
      "里脊切细丝，用淀粉和料酒抓匀",
      "金针菇去根撕开，冲洗干净",
      "水开后下姜丝和金针菇煮 2 分钟",
      "下肉丝滑散煮至变色，加盐撒葱花"
    ],
    "nutrition": {
      "kcal": 90,
      "protein": 10,
      "fat": 3,
      "carbs": 6,
      "calcium": 15,
      "iron": 1.2
    },
    "tip": "肉丝上浆后再下锅口感嫩滑，金针菇富含膳食纤维，饭前喝助增饱腹感。"
  },
  {
    "id": "s14",
    "name": "西葫芦虾仁汤",
    "type": "soup",
    "spicy": false,
    "tags": [
      "清爽",
      "快手",
      "儿童友好"
    ],
    "time": 10,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "西葫芦",
        "amount": 150,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "冷冻虾仁",
        "amount": 60,
        "unit": "g",
        "category": "水产海鲜"
      },
      {
        "name": "姜",
        "amount": 3,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "料酒",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      },
      {
        "name": "香油",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      }
    ],
    "steps": [
      "虾仁解冻后用料酒腌 5 分钟",
      "西葫芦切半圆薄片",
      "水开后下姜丝和西葫芦煮 2 分钟",
      "下虾仁煮至变红卷起，加盐滴香油"
    ],
    "nutrition": {
      "kcal": 75,
      "protein": 12,
      "fat": 2,
      "carbs": 4,
      "calcium": 50,
      "iron": 0.9
    },
    "tip": "虾仁高蛋白低脂肪，汤色清甜不腥，是孩子容易接受的补蛋白快手汤。"
  },
  {
    "id": "s15",
    "name": "平菇肉片汤",
    "type": "soup",
    "spicy": false,
    "tags": [
      "快手",
      "适合老人"
    ],
    "time": 12,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "平菇",
        "amount": 120,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "猪里脊肉",
        "amount": 50,
        "unit": "g",
        "category": "肉禽蛋"
      },
      {
        "name": "姜",
        "amount": 3,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "小葱",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "玉米淀粉",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      },
      {
        "name": "黑胡椒",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      }
    ],
    "steps": [
      "平菇撕成小条，里脊切薄片上浆",
      "水开后下姜丝和平菇煮 3 分钟",
      "下肉片滑散，煮至完全变色",
      "加盐和少许黑胡椒，撒葱花出锅"
    ],
    "nutrition": {
      "kcal": 95,
      "protein": 11,
      "fat": 3,
      "carbs": 7,
      "calcium": 12,
      "iron": 1.4
    },
    "tip": "菌菇的鲜味物质能替代部分盐，汤鲜味足，适合牙口一般的老人。"
  },
  {
    "id": "s16",
    "name": "青菜豆腐汤",
    "type": "soup",
    "spicy": false,
    "tags": [
      "清爽",
      "成本超低",
      "适合老人"
    ],
    "time": 10,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "上海青",
        "amount": 100,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "嫩豆腐",
        "amount": 150,
        "unit": "g",
        "category": "奶品豆制品"
      },
      {
        "name": "虾皮",
        "amount": 2,
        "unit": "g",
        "category": "调味干货"
      },
      {
        "name": "食用油",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      }
    ],
    "steps": [
      "上海青洗净切段，豆腐切小块",
      "水开后加几滴油，下豆腐煮 3 分钟",
      "放入上海青和虾皮煮 1 分钟",
      "加盐调味即可出锅"
    ],
    "nutrition": {
      "kcal": 75,
      "protein": 8,
      "fat": 3,
      "carbs": 4,
      "calcium": 190,
      "iron": 1.8
    },
    "tip": "青菜加豆腐是经典补钙组合，绿叶菜煮的时间短，维生素 C 保留更多。"
  },
  {
    "id": "s17",
    "name": "酸辣汤",
    "type": "soup",
    "spicy": true,
    "tags": [
      "开胃",
      "快手"
    ],
    "time": 15,
    "difficulty": "中等",
    "ingredients": [
      {
        "name": "嫩豆腐",
        "amount": 100,
        "unit": "g",
        "category": "奶品豆制品"
      },
      {
        "name": "金针菇",
        "amount": 50,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "干木耳",
        "amount": 5,
        "unit": "g",
        "category": "调味干货"
      },
      {
        "name": "胡萝卜",
        "amount": 30,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "鸡蛋",
        "amount": 1,
        "unit": "个",
        "category": "肉禽蛋"
      },
      {
        "name": "香醋",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      },
      {
        "name": "黑胡椒",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      },
      {
        "name": "生抽",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      },
      {
        "name": "玉米淀粉",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      }
    ],
    "steps": [
      "木耳泡发切丝，豆腐、胡萝卜切细丝",
      "水开后下所有丝料煮 3 分钟",
      "加生抽、盐，用水淀粉勾薄芡",
      "淋蛋液成蛋花，关火加醋和黑胡椒"
    ],
    "nutrition": {
      "kcal": 110,
      "protein": 9,
      "fat": 5,
      "carbs": 9,
      "calcium": 130,
      "iron": 2.5
    },
    "tip": "酸味来自醋、辣味来自胡椒，不额外加辣油，开胃又不给肠胃增加负担。"
  },
  {
    "id": "s18",
    "name": "番茄疙瘩汤",
    "type": "soup",
    "spicy": false,
    "tags": [
      "开胃",
      "儿童友好",
      "快手"
    ],
    "time": 15,
    "difficulty": "中等",
    "ingredients": [
      {
        "name": "番茄",
        "amount": 150,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "面粉",
        "amount": 30,
        "unit": "g",
        "category": "米面粮油"
      },
      {
        "name": "鸡蛋",
        "amount": 1,
        "unit": "个",
        "category": "肉禽蛋"
      },
      {
        "name": "小葱",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "食用油",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      },
      {
        "name": "香油",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      }
    ],
    "steps": [
      "面粉少量多次滴水，搅成小疙瘩",
      "热锅少油炒番茄块至出沙，加水煮开",
      "拨入面疙瘩，边下边搅防粘连",
      "煮 3 分钟后淋蛋液，加盐撒葱花"
    ],
    "nutrition": {
      "kcal": 140,
      "protein": 8,
      "fat": 5,
      "carbs": 17,
      "calcium": 30,
      "iron": 1.3
    },
    "tip": "经典北方家常汤，带主食属性，胃口不好或感冒时喝一碗暖胃又易消化。"
  },
  {
    "id": "s19",
    "name": "甜玉米蛋花羹",
    "type": "soup",
    "spicy": false,
    "tags": [
      "儿童友好",
      "快手",
      "开胃"
    ],
    "time": 10,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "甜玉米",
        "amount": 100,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "鸡蛋",
        "amount": 1,
        "unit": "个",
        "category": "肉禽蛋"
      },
      {
        "name": "玉米淀粉",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      },
      {
        "name": "白糖",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      }
    ],
    "steps": [
      "甜玉米剥粒，加水煮 5 分钟",
      "用水淀粉勾薄芡，汤微微浓稠",
      "转小火淋入蛋液，划出蛋花",
      "加少许盐和糖提味即可"
    ],
    "nutrition": {
      "kcal": 130,
      "protein": 8,
      "fat": 5,
      "carbs": 15,
      "calcium": 30,
      "iron": 1
    },
    "tip": "玉米自带清甜，糖只需一点点提味，是孩子接受度极高的一道羹汤。"
  },
  {
    "id": "s20",
    "name": "虾仁豆腐羹",
    "type": "soup",
    "spicy": false,
    "tags": [
      "补钙",
      "儿童友好"
    ],
    "time": 15,
    "difficulty": "中等",
    "ingredients": [
      {
        "name": "冷冻虾仁",
        "amount": 60,
        "unit": "g",
        "category": "水产海鲜"
      },
      {
        "name": "嫩豆腐",
        "amount": 150,
        "unit": "g",
        "category": "奶品豆制品"
      },
      {
        "name": "鸡蛋",
        "amount": 1,
        "unit": "个",
        "category": "肉禽蛋"
      },
      {
        "name": "小葱",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "玉米淀粉",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      },
      {
        "name": "料酒",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      },
      {
        "name": "香油",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      }
    ],
    "steps": [
      "虾仁解冻切丁，用料酒腌 5 分钟",
      "豆腐切小丁，水开后下锅煮 2 分钟",
      "下虾仁丁煮至变色，水淀粉勾芡",
      "淋蛋液推成蛋花，加盐滴香油撒葱花"
    ],
    "nutrition": {
      "kcal": 135,
      "protein": 16,
      "fat": 6,
      "carbs": 6,
      "calcium": 160,
      "iron": 1.6
    },
    "tip": "虾仁加豆腐蛋白质互补，质地软嫩，特别适合幼儿和咀嚼不便的老人。"
  },
  {
    "id": "s21",
    "name": "粉丝丸子汤",
    "type": "soup",
    "spicy": false,
    "tags": [
      "儿童友好",
      "开胃"
    ],
    "time": 20,
    "difficulty": "中等",
    "ingredients": [
      {
        "name": "猪肉末",
        "amount": 70,
        "unit": "g",
        "category": "肉禽蛋"
      },
      {
        "name": "龙口粉丝",
        "amount": 20,
        "unit": "g",
        "category": "米面粮油"
      },
      {
        "name": "上海青",
        "amount": 60,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "姜",
        "amount": 3,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "小葱",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "玉米淀粉",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      },
      {
        "name": "料酒",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      },
      {
        "name": "生抽",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      }
    ],
    "steps": [
      "肉末加姜末、料酒、生抽、淀粉搅上劲",
      "粉丝温水泡软剪短",
      "水微开时挤入丸子，煮至全部浮起",
      "下粉丝和上海青煮 2 分钟，加盐撒葱花"
    ],
    "nutrition": {
      "kcal": 140,
      "protein": 13,
      "fat": 6,
      "carbs": 10,
      "calcium": 45,
      "iron": 1.5
    },
    "tip": "丸子在水将开未开时下锅不易散，自制丸子比市售的钠和脂肪都更可控。"
  },
  {
    "id": "s22",
    "name": "奶香玉米浓汤",
    "type": "soup",
    "spicy": false,
    "tags": [
      "儿童友好",
      "补钙"
    ],
    "time": 20,
    "difficulty": "中等",
    "ingredients": [
      {
        "name": "甜玉米",
        "amount": 80,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "土豆",
        "amount": 50,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "纯牛奶",
        "amount": 150,
        "unit": "ml",
        "category": "奶品豆制品"
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      },
      {
        "name": "黑胡椒",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      }
    ],
    "steps": [
      "玉米剥粒，土豆切小块，加水煮软",
      "连汤倒入料理机打成细腻糊状",
      "倒回锅中加牛奶，小火煮至微开",
      "加少许盐和黑胡椒调味"
    ],
    "nutrition": {
      "kcal": 140,
      "protein": 6,
      "fat": 5,
      "carbs": 20,
      "calcium": 160,
      "iron": 0.6
    },
    "tip": "用牛奶和土豆打底代替奶油和黄油，同样浓郁顺滑，脂肪却少一大半。"
  },
  {
    "id": "s23",
    "name": "莲藕排骨汤",
    "type": "soup",
    "spicy": false,
    "tags": [
      "周末煲汤",
      "滋补",
      "适合老人"
    ],
    "time": 90,
    "difficulty": "中等",
    "ingredients": [
      {
        "name": "猪肋排",
        "amount": 100,
        "unit": "g",
        "category": "肉禽蛋"
      },
      {
        "name": "莲藕",
        "amount": 120,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "姜",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "小葱",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "料酒",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      }
    ],
    "steps": [
      "排骨冷水下锅，加料酒焯水撇净浮沫",
      "莲藕去皮切滚刀块",
      "排骨加姜片和足量热水，小火炖 1 小时",
      "下藕块再炖 30 分钟，出锅前加盐"
    ],
    "nutrition": {
      "kcal": 140,
      "protein": 11,
      "fat": 8,
      "carbs": 12,
      "calcium": 40,
      "iron": 1.6
    },
    "tip": "粉藕久炖更绵糯，盐最后放可减少用量；喝汤记得把肉和藕一起吃掉。"
  },
  {
    "id": "s24",
    "name": "海带筒骨汤",
    "type": "soup",
    "spicy": false,
    "tags": [
      "周末煲汤",
      "补钙",
      "滋补"
    ],
    "time": 120,
    "difficulty": "中等",
    "ingredients": [
      {
        "name": "猪筒骨",
        "amount": 150,
        "unit": "g",
        "category": "肉禽蛋"
      },
      {
        "name": "海带",
        "amount": 80,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "姜",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "料酒",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      },
      {
        "name": "香醋",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      }
    ],
    "steps": [
      "筒骨冷水下锅加料酒焯水，冲净浮沫",
      "海带洗净切块",
      "筒骨加姜片、几滴醋和热水，小火炖 1.5 小时",
      "下海带再炖 30 分钟，加盐调味"
    ],
    "nutrition": {
      "kcal": 110,
      "protein": 8,
      "fat": 6,
      "carbs": 5,
      "calcium": 90,
      "iron": 1.2
    },
    "tip": "炖骨汤加几滴醋有助矿物质溶出；海带补碘，甲状腺疾病患者需遵医嘱。"
  },
  {
    "id": "s25",
    "name": "香菇炖鸡汤",
    "type": "soup",
    "spicy": false,
    "tags": [
      "周末煲汤",
      "滋补"
    ],
    "time": 60,
    "difficulty": "中等",
    "ingredients": [
      {
        "name": "鸡腿肉",
        "amount": 80,
        "unit": "g",
        "category": "肉禽蛋"
      },
      {
        "name": "干香菇",
        "amount": 8,
        "unit": "g",
        "category": "调味干货"
      },
      {
        "name": "红枣",
        "amount": 10,
        "unit": "g",
        "category": "调味干货"
      },
      {
        "name": "枸杞",
        "amount": 3,
        "unit": "g",
        "category": "调味干货"
      },
      {
        "name": "姜",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "料酒",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      }
    ],
    "steps": [
      "干香菇提前温水泡发，泡菇水留用",
      "鸡腿肉切块，冷水加料酒焯水",
      "鸡块、香菇、红枣加姜片和泡菇水炖 50 分钟",
      "出锅前 5 分钟放枸杞，加盐调味"
    ],
    "nutrition": {
      "kcal": 135,
      "protein": 14,
      "fat": 6,
      "carbs": 8,
      "calcium": 20,
      "iron": 1.5
    },
    "tip": "泡香菇的水别倒掉，鲜味核苷酸都在里面，能让鸡汤更鲜而少放盐。"
  },
  {
    "id": "s26",
    "name": "白萝卜牛腩汤",
    "type": "soup",
    "spicy": false,
    "tags": [
      "周末煲汤",
      "适合老人",
      "滋补"
    ],
    "time": 100,
    "difficulty": "中等",
    "ingredients": [
      {
        "name": "牛腩",
        "amount": 70,
        "unit": "g",
        "category": "肉禽蛋"
      },
      {
        "name": "白萝卜",
        "amount": 150,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "姜",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "小葱",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "八角",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      },
      {
        "name": "料酒",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      }
    ],
    "steps": [
      "牛腩切块冷水下锅，加料酒焯水洗净",
      "加姜片、一颗八角和热水，小火炖 70 分钟",
      "白萝卜切块下锅，再炖 25 分钟",
      "加盐调味，撒葱花出锅"
    ],
    "nutrition": {
      "kcal": 125,
      "protein": 12,
      "fat": 6,
      "carbs": 6,
      "calcium": 35,
      "iron": 2.2
    },
    "tip": "牛腩富含铁和优质蛋白，萝卜炖到透亮入口即化，很适合老人补铁。"
  },
  {
    "id": "s28",
    "name": "冰糖绿豆汤",
    "type": "soup",
    "spicy": false,
    "tags": [
      "清润",
      "成本超低",
      "周末煲汤"
    ],
    "time": 45,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "绿豆",
        "amount": 30,
        "unit": "g",
        "category": "米面粮油"
      },
      {
        "name": "冰糖",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      }
    ],
    "steps": [
      "绿豆淘洗后清水浸泡 30 分钟",
      "加约 6 倍水，大火煮开转小火",
      "煮 30 分钟至绿豆开花",
      "加少量冰糖搅化，放温饮用"
    ],
    "nutrition": {
      "kcal": 105,
      "protein": 6,
      "fat": 0.3,
      "carbs": 20,
      "calcium": 25,
      "iron": 1.8
    },
    "tip": "夏日消暑经典，糖越少越好；连豆一起吃能获得更多蛋白质和膳食纤维。"
  },
  {
    "id": "s29",
    "name": "银耳红枣汤",
    "type": "soup",
    "spicy": false,
    "tags": [
      "清润",
      "滋补",
      "适合老人"
    ],
    "time": 60,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "银耳",
        "amount": 10,
        "unit": "g",
        "category": "调味干货"
      },
      {
        "name": "红枣",
        "amount": 15,
        "unit": "g",
        "category": "调味干货"
      },
      {
        "name": "枸杞",
        "amount": 3,
        "unit": "g",
        "category": "调味干货"
      },
      {
        "name": "冰糖",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      }
    ],
    "steps": [
      "银耳提前泡发 1 小时，撕小朵去黄根",
      "银耳加足量水，大火煮开转小火炖 40 分钟",
      "加红枣继续炖 15 分钟至出胶",
      "放枸杞和少量冰糖，再煮 5 分钟"
    ],
    "nutrition": {
      "kcal": 90,
      "protein": 2,
      "fat": 0.3,
      "carbs": 21,
      "calcium": 30,
      "iron": 1
    },
    "tip": "银耳的顺滑来自可溶性膳食纤维，对肠道友好；控糖人群可不加冰糖。"
  },
  {
    "id": "s30",
    "name": "冬瓜薏米汤",
    "type": "soup",
    "spicy": false,
    "tags": [
      "清润",
      "清爽",
      "周末煲汤"
    ],
    "time": 60,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "冬瓜",
        "amount": 150,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "薏米",
        "amount": 20,
        "unit": "g",
        "category": "米面粮油"
      },
      {
        "name": "姜",
        "amount": 3,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      }
    ],
    "steps": [
      "薏米淘洗后浸泡 1 小时",
      "薏米加姜片和水，小火煮 40 分钟",
      "冬瓜连皮切块下锅，再煮 15 分钟",
      "加少许盐调味即可"
    ],
    "nutrition": {
      "kcal": 85,
      "protein": 3,
      "fat": 0.5,
      "carbs": 18,
      "calcium": 30,
      "iron": 1
    },
    "tip": "冬瓜连皮煮汤钾和膳食纤维更足，这碗汤低脂低钠，湿热天气很合适。"
  },
  {
    "id": "st04",
    "name": "小米红枣粥",
    "type": "staple",
    "spicy": false,
    "tags": [
      "粗粮",
      "儿童友好",
      "一锅出"
    ],
    "time": 35,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "小米",
        "amount": 55,
        "unit": "g",
        "category": "米面粮油"
      },
      {
        "name": "红枣",
        "amount": 12,
        "unit": "g",
        "category": "调味干货"
      }
    ],
    "steps": [
      "小米淘洗一遍，红枣去核切小块",
      "加约 8 倍水，大火煮开",
      "转小火熬 25 分钟，中途搅动防粘底",
      "熬至粥面浮起米油即可"
    ],
    "nutrition": {
      "kcal": 240,
      "protein": 6,
      "fat": 2,
      "carbs": 50,
      "calcium": 25,
      "iron": 3
    },
    "tip": "小米富含 B 族维生素，红枣自带甜味无需加糖，适合当早餐或晚餐主食。"
  },
  {
    "id": "st05",
    "name": "黑米饭",
    "type": "staple",
    "spicy": false,
    "tags": [
      "粗粮",
      "控糖",
      "主食"
    ],
    "time": 45,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "大米",
        "amount": 50,
        "unit": "g",
        "category": "米面粮油"
      },
      {
        "name": "黑米",
        "amount": 25,
        "unit": "g",
        "category": "米面粮油"
      }
    ],
    "steps": [
      "黑米提前浸泡 2 小时，泡米水别倒",
      "与淘净的大米混合放入电饭煲",
      "水量比纯白米饭略多一点",
      "按煮饭键，跳闸后焖 10 分钟"
    ],
    "nutrition": {
      "kcal": 260,
      "protein": 6,
      "fat": 1,
      "carbs": 56,
      "calcium": 15,
      "iron": 1.8
    },
    "tip": "黑米的花青素在泡米水里，连水一起煮不浪费；粗细搭配升糖更平稳。"
  },
  {
    "id": "st06",
    "name": "藜麦糙米饭",
    "type": "staple",
    "spicy": false,
    "tags": [
      "控糖",
      "粗粮",
      "饱腹"
    ],
    "time": 50,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "大米",
        "amount": 40,
        "unit": "g",
        "category": "米面粮油"
      },
      {
        "name": "糙米",
        "amount": 20,
        "unit": "g",
        "category": "米面粮油"
      },
      {
        "name": "藜麦",
        "amount": 15,
        "unit": "g",
        "category": "米面粮油"
      }
    ],
    "steps": [
      "糙米提前浸泡 1 小时",
      "藜麦用细网筛冲洗去皂苷",
      "三种米混合，水量为米的 1.3 倍",
      "电饭煲煮熟后焖 10 分钟再开盖"
    ],
    "nutrition": {
      "kcal": 265,
      "protein": 7,
      "fat": 2,
      "carbs": 54,
      "calcium": 20,
      "iron": 1.6
    },
    "tip": "藜麦是优质植物蛋白来源，配糙米升糖指数低，适合控糖和减脂人群。"
  },
  {
    "id": "st07",
    "name": "燕麦米饭",
    "type": "staple",
    "spicy": false,
    "tags": [
      "控糖",
      "粗粮",
      "饱腹"
    ],
    "time": 50,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "大米",
        "amount": 50,
        "unit": "g",
        "category": "米面粮油"
      },
      {
        "name": "燕麦米",
        "amount": 25,
        "unit": "g",
        "category": "米面粮油"
      }
    ],
    "steps": [
      "燕麦米提前浸泡 1 小时",
      "与淘净的大米混合入锅",
      "水量比平时煮白米饭多一成",
      "煮熟后焖 10 分钟，口感更弹润"
    ],
    "nutrition": {
      "kcal": 260,
      "protein": 7,
      "fat": 2,
      "carbs": 53,
      "calcium": 18,
      "iron": 1.5
    },
    "tip": "燕麦米的 β-葡聚糖有助平稳餐后血糖、辅助降胆固醇，嚼劲足更耐饿。"
  },
  {
    "id": "st08",
    "name": "绿豆饭",
    "type": "staple",
    "spicy": false,
    "tags": [
      "粗粮",
      "主食",
      "饱腹"
    ],
    "time": 50,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "大米",
        "amount": 55,
        "unit": "g",
        "category": "米面粮油"
      },
      {
        "name": "绿豆",
        "amount": 20,
        "unit": "g",
        "category": "米面粮油"
      }
    ],
    "steps": [
      "绿豆提前浸泡 2 小时",
      "与淘净的大米混合放入电饭煲",
      "水量比纯白米饭略多",
      "煮熟焖 10 分钟后拌匀盛出"
    ],
    "nutrition": {
      "kcal": 255,
      "protein": 8,
      "fat": 1,
      "carbs": 54,
      "calcium": 25,
      "iron": 2
    },
    "tip": "豆类和大米蛋白质互补，整体蛋白质利用率更高，夏天吃还清爽解腻。"
  },
  {
    "id": "st09",
    "name": "荞麦汤面",
    "type": "staple",
    "spicy": false,
    "tags": [
      "控糖",
      "快手",
      "主食"
    ],
    "time": 12,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "荞麦面",
        "amount": 75,
        "unit": "g",
        "category": "米面粮油"
      },
      {
        "name": "上海青",
        "amount": 50,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "小葱",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "生抽",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      },
      {
        "name": "香油",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      }
    ],
    "steps": [
      "水开后下荞麦面，按包装时间煮熟",
      "最后 1 分钟放入上海青烫熟",
      "碗中放生抽、香油和少许盐，冲入面汤",
      "捞入面条和青菜，撒葱花即可"
    ],
    "nutrition": {
      "kcal": 270,
      "protein": 10,
      "fat": 3,
      "carbs": 53,
      "calcium": 60,
      "iron": 2.5
    },
    "tip": "荞麦面升糖指数低于白面条，饱腹感强，控糖人群可放心作为主食轮换。"
  },
  {
    "id": "st10",
    "name": "全麦馒头",
    "type": "staple",
    "spicy": false,
    "tags": [
      "粗粮",
      "快手",
      "主食"
    ],
    "time": 10,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "全麦馒头",
        "amount": 1,
        "unit": "个",
        "category": "米面粮油"
      }
    ],
    "steps": [
      "蒸锅加水烧开",
      "馒头放入蒸屉，中火蒸 8 分钟",
      "关火焖 1 分钟取出，趁热食用"
    ],
    "nutrition": {
      "kcal": 235,
      "protein": 8,
      "fat": 1.5,
      "carbs": 48,
      "calcium": 30,
      "iron": 2.2
    },
    "tip": "选配料表以全麦粉排第一位的馒头，膳食纤维更足，冷冻保存随蒸随吃。"
  },
  {
    "id": "st11",
    "name": "葱香花卷",
    "type": "staple",
    "spicy": false,
    "tags": [
      "快手",
      "儿童友好",
      "主食"
    ],
    "time": 10,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "花卷",
        "amount": 1,
        "unit": "个",
        "category": "米面粮油"
      }
    ],
    "steps": [
      "蒸锅加水烧开",
      "花卷放入蒸屉，中火蒸 8 分钟",
      "关火焖 1 分钟，松软即食"
    ],
    "nutrition": {
      "kcal": 250,
      "protein": 7,
      "fat": 4,
      "carbs": 46,
      "calcium": 25,
      "iron": 1.8
    },
    "tip": "花卷含油盐略高于馒头，当天搭配的菜可以做得清淡些来平衡钠摄入。"
  },
  {
    "id": "st12",
    "name": "牛奶燕麦粥",
    "type": "staple",
    "spicy": false,
    "tags": [
      "快手",
      "儿童友好",
      "控糖"
    ],
    "time": 8,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "即食燕麦片",
        "amount": 40,
        "unit": "g",
        "category": "米面粮油"
      },
      {
        "name": "纯牛奶",
        "amount": 200,
        "unit": "ml",
        "category": "奶品豆制品"
      }
    ],
    "steps": [
      "小锅加半碗水烧开，倒入燕麦片",
      "小火煮 2 分钟至浓稠",
      "倒入牛奶搅匀，煮至微微冒泡关火",
      "静置 1 分钟口感更顺滑"
    ],
    "nutrition": {
      "kcal": 275,
      "protein": 12,
      "fat": 9,
      "carbs": 38,
      "calcium": 240,
      "iron": 1.8
    },
    "tip": "一碗同时补钙和膳食纤维，选纯燕麦片而非风味麦片，可避免添加糖。"
  },
  {
    "id": "st13",
    "name": "玉米糁粥",
    "type": "staple",
    "spicy": false,
    "tags": [
      "粗粮",
      "一锅出",
      "主食"
    ],
    "time": 30,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "玉米糁",
        "amount": 60,
        "unit": "g",
        "category": "米面粮油"
      }
    ],
    "steps": [
      "玉米糁用少量凉水调开防结块",
      "锅中水烧开，边搅边倒入玉米糁",
      "小火熬 20 分钟，勤搅拌防粘底",
      "熬至浓稠冒泡即可"
    ],
    "nutrition": {
      "kcal": 230,
      "protein": 5,
      "fat": 2,
      "carbs": 49,
      "calcium": 10,
      "iron": 1.5
    },
    "tip": "北方家常棒子面粥，玉米黄素对眼睛友好，配个鸡蛋和青菜就是一餐。"
  },
  {
    "id": "st14",
    "name": "二米饭",
    "type": "staple",
    "spicy": false,
    "tags": [
      "粗粮",
      "儿童友好",
      "主食"
    ],
    "time": 40,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "大米",
        "amount": 50,
        "unit": "g",
        "category": "米面粮油"
      },
      {
        "name": "小米",
        "amount": 25,
        "unit": "g",
        "category": "米面粮油"
      }
    ],
    "steps": [
      "大米和小米一起淘洗两遍",
      "放入电饭煲，水量与白米饭相同",
      "按煮饭键，跳闸后焖 10 分钟",
      "拌松散热气即可盛出"
    ],
    "nutrition": {
      "kcal": 265,
      "protein": 6,
      "fat": 1.5,
      "carbs": 57,
      "calcium": 15,
      "iron": 1.6
    },
    "tip": "小米无需浸泡就能与大米同煮，是全家最容易接受的粗粮入门吃法。"
  },
  {
    "id": "st15",
    "name": "阳春面",
    "type": "staple",
    "spicy": false,
    "tags": [
      "快手",
      "主食",
      "饱腹"
    ],
    "time": 10,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "挂面",
        "amount": 75,
        "unit": "g",
        "category": "米面粮油"
      },
      {
        "name": "小葱",
        "amount": 8,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "生抽",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      },
      {
        "name": "香油",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "pantry": true,
        "category": "调味干货"
      }
    ],
    "steps": [
      "碗中放生抽、少许盐、香油和葱花",
      "水开后下挂面煮 3 分钟至无硬芯",
      "舀一勺滚烫面汤冲开碗底料",
      "捞入面条拌匀即可"
    ],
    "nutrition": {
      "kcal": 270,
      "protein": 8,
      "fat": 3,
      "carbs": 54,
      "calcium": 15,
      "iron": 1.4
    },
    "tip": "挂面本身含钠，碗底盐要少放；加个荷包蛋和青菜营养会更完整。"
  },
  {
    "id": "m77",
    "name": "冬瓜烧虾仁",
    "type": "meat",
    "spicy": false,
    "tags": [
      "低脂",
      "高蛋白",
      "适合老人"
    ],
    "time": 15,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "冷冻虾仁",
        "amount": 70,
        "unit": "g",
        "category": "水产海鲜"
      },
      {
        "name": "冬瓜",
        "amount": 120,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "姜",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "小葱",
        "amount": 3,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "玉米淀粉",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "虾仁解冻擦干，用盐和淀粉抓匀腌 5 分钟；冬瓜去皮切厚片。",
      "热锅少油下姜丝，冬瓜片煎至两面微透明。",
      "加小半碗热水焖 3 分钟至冬瓜软糯。",
      "下虾仁烧 2 分钟至变色，淀粉水勾薄芡，撒葱花出锅。"
    ],
    "nutrition": {
      "kcal": 120,
      "protein": 15,
      "fat": 4,
      "carbs": 6,
      "calcium": 60,
      "iron": 1.2
    },
    "tip": "虾仁高蛋白低脂肪，冬瓜清爽多汁，这道菜热量低又顶饱，适合控体重的成员。"
  },
  {
    "id": "s32",
    "name": "娃娃菜粉丝汤",
    "type": "soup",
    "spicy": false,
    "tags": [
      "清爽",
      "快手",
      "成本超低"
    ],
    "time": 12,
    "difficulty": "简单",
    "ingredients": [
      {
        "name": "娃娃菜",
        "amount": 100,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "龙口粉丝",
        "amount": 15,
        "unit": "g",
        "category": "米面粮油"
      },
      {
        "name": "虾皮",
        "amount": 2,
        "unit": "g",
        "category": "调味干货"
      },
      {
        "name": "蒜",
        "amount": 5,
        "unit": "g",
        "category": "蔬菜水果"
      },
      {
        "name": "食盐",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      },
      {
        "name": "香油",
        "amount": 0,
        "unit": "适量",
        "category": "调味干货",
        "pantry": true
      }
    ],
    "steps": [
      "粉丝温水泡软；娃娃菜纵切成条。",
      "少油爆香蒜片和虾皮，下娃娃菜炒软。",
      "加两碗热水烧开，下粉丝煮 2 分钟。",
      "加盐调味，滴香油出锅。"
    ],
    "nutrition": {
      "kcal": 80,
      "protein": 3,
      "fat": 3,
      "carbs": 12,
      "calcium": 70,
      "iron": 0.8
    },
    "tip": "娃娃菜甜嫩易消化，粉丝吸味，一碗汤兼顾了蔬菜和一点主食。"
  }
];

module.exports = { RECIPES };
