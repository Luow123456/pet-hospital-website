const mongoose = require('mongoose');
require('dotenv').config();

const Doctor = require('./models/Doctor');
const Product = require('./models/Product');

// 连接 MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', async () => {
  console.log('Connected to MongoDB');

  try {
    // 清空现有数据
    await Doctor.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');

    // 添加医生数据
    const doctors = [
      {
        name: '李医生',
        email: 'li@pethospital.com',
        phone: '13800000001',
        specialty: '内科',
        qualification: '北京大学医学部硕士',
        experience: 8,
        introduction: '擅长小动物常见病诊疗，临床经验丰富',
        avatar: 'https://via.placeholder.com/150?text=Dr.Li',
      },
      {
        name: '王医生',
        email: 'wang@pethospital.com',
        phone: '13800000002',
        specialty: '外科',
        qualification: '上海交通大学医学院博士',
        experience: 10,
        introduction: '专业从事宠物外科手术，手术成功率高',
        avatar: 'https://via.placeholder.com/150?text=Dr.Wang',
      },
      {
        name: '张医生',
        email: 'zhang@pethospital.com',
        phone: '13800000003',
        specialty: '牙科',
        qualification: '浙江大学医学部硕士',
        experience: 6,
        introduction: '专业宠物牙科医生，治疗效果显著',
        avatar: 'https://via.placeholder.com/150?text=Dr.Zhang',
      },
      {
        name: '刘医生',
        email: 'liu@pethospital.com',
        phone: '13800000004',
        specialty: '皮肤科',
        qualification: '北京医科大学本科',
        experience: 5,
        introduction: '擅长宠物皮肤病诊疗和护理',
        avatar: 'https://via.placeholder.com/150?text=Dr.Liu',
      },
      {
        name: '陈医生',
        email: 'chen@pethospital.com',
        phone: '13800000005',
        specialty: '急诊科',
        qualification: '复旦大学医学院硕士',
        experience: 12,
        introduction: '24小时值班，擅长急诊救治',
        avatar: 'https://via.placeholder.com/150?text=Dr.Chen',
      },
    ];

    await Doctor.insertMany(doctors);
    console.log(`Added ${doctors.length} doctors`);

    // 添加商品数据
    const products = [
      {
        name: '犬用维生素补充剂',
        description: '全面补充狗狗所需的维生素和矿物质',
        price: 89.99,
        stock: 50,
        category: '营养品',
        specifications: '200粒/瓶',
        image: 'https://via.placeholder.com/200?text=Vitamins',
      },
      {
        name: '猫咪益生菌粉',
        description: '调理肠胃，增强免疫力',
        price: 59.99,
        stock: 30,
        category: '营养品',
        specifications: '30克/盒',
        image: 'https://via.placeholder.com/200?text=Probiotics',
      },
      {
        name: '宠物止血钳',
        description: '专业医疗工具，用于止血',
        price: 129.99,
        stock: 20,
        category: '医疗工具',
        specifications: '不锈钢材质',
        image: 'https://via.placeholder.com/200?text=Clamp',
      },
      {
        name: '消毒湿巾',
        description: '快速清洁和消毒宠物用品',
        price: 39.99,
        stock: 100,
        category: '清洁用品',
        specifications: '50片/包',
        image: 'https://via.placeholder.com/200?text=Wipes',
      },
      {
        name: '宠物用拉肚子药',
        description: '快速缓解宠物腹泻症状',
        price: 49.99,
        stock: 40,
        category: '药物',
        specifications: '10粒/盒',
        image: 'https://via.placeholder.com/200?text=Medicine',
      },
      {
        name: '宠物用驱虫药',
        description: '安全有效的驱虫产品',
        price: 69.99,
        stock: 35,
        category: '药物',
        specifications: '单剂次',
        image: 'https://via.placeholder.com/200?text=Dewormer',
      },
    ];

    await Product.insertMany(products);
    console.log(`Added ${products.length} products`);

    console.log('Data seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    db.close();
  }
});
