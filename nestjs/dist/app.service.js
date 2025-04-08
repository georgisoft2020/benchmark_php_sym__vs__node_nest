"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const benchmark_item_entity_1 = require("./benchmark-item.entity");
let AppService = class AppService {
    constructor(benchmarkItemRepository) {
        this.benchmarkItemRepository = benchmarkItemRepository;
    }
    async findAll() {
        return this.benchmarkItemRepository.find();
    }
    async findOne(id) {
        return this.benchmarkItemRepository.findOne({ where: { id } });
    }
    async findByName(name) {
        return this.benchmarkItemRepository.find({ where: { name } });
    }
    async create(item) {
        const newItem = this.benchmarkItemRepository.create(item);
        return this.benchmarkItemRepository.save(newItem);
    }
    async update(id, item) {
        await this.benchmarkItemRepository.update(id, item);
    }
    async delete(id) {
        await this.benchmarkItemRepository.delete(id);
    }
    async benchmark() {
        const startTime = process.hrtime();
        await this.findAll();
        await this.findOne(1);
        await this.findByName('item1');
        await this.findAll();
        await this.findOne(2);
        await this.findByName('item2');
        await this.findAll();
        await this.findOne(3);
        await this.findByName('item3');
        await this.findOne(4);
        const randomStr = Math.random().toString(36).substring(7);
        await this.create({ name: `benchmark-${randomStr}-1`, value: 'Test value 1' });
        await this.create({ name: `benchmark-${randomStr}-2`, value: 'Test value 2' });
        await this.create({ name: `benchmark-${randomStr}-3`, value: 'Test value 3' });
        await this.create({ name: `benchmark-${randomStr}-4`, value: 'Test value 4' });
        await this.create({ name: `benchmark-${randomStr}-5`, value: 'Test value 5' });
        await this.update(1, { value: `Updated at ${new Date().toISOString()}` });
        await this.update(2, { value: `Updated at ${new Date().toISOString()}` });
        await this.update(3, { value: `Updated at ${new Date().toISOString()}` });
        await this.update(4, { value: `Updated at ${new Date().toISOString()}` });
        await this.update(5, { value: `Updated at ${new Date().toISOString()}` });
        const diff = process.hrtime(startTime);
        const duration = (diff[0] * 1e9 + diff[1]) / 1e6;
        return { duration };
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(benchmark_item_entity_1.BenchmarkItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AppService);
//# sourceMappingURL=app.service.js.map