import OpenAI from "openai";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { TestCase, Config } from './test-bench.d';
import { Logger } from "winston";
import ConversationGenerator from './conversation-generator';
import ConversationEvaluator from './conversation-evaluator';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class VoiceAITestBench {
  private config: Config;
  private conversationGenerator!: ConversationGenerator;
  private conversationEvaluator!: ConversationEvaluator;
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
    this.config = this.readConfig();
  }

  readConfig(): Config {
    const configFilePath = path.join(__dirname, '/../', 'config.json');
    const configFileContent = fs.readFileSync(configFilePath, 'utf-8');
    const config: Config = JSON.parse(configFileContent);

    this.logger.info('Config read');
    this.logger.debug(`Config: ${JSON.stringify(config, null, 2)}`);

    return config;
  }

  saveTestResult(testResult: any, testFile: string) {
    const testFileName = path.basename(testFile, path.extname(testFile));
    const resultFilePath = path.join(__dirname, '/../', this.config.test_suite.results_dir, `${testFileName}-${Date.now()}-result.json`);
    fs.writeFileSync(resultFilePath, JSON.stringify(testResult, null, 2), 'utf-8');
    this.logger.info(`Test result saved to ${resultFilePath}`);
  }

  async runTestCase(testCase: TestCase) {
    this.logger.info(`Running test case`);
    this.logger.debug(`Test case: ${JSON.stringify(testCase, null, 2)}`);
    this.logger.info(`Instructions: ${testCase.instructions}`);

    this.conversationGenerator = new ConversationGenerator(this.config, testCase, this.logger);
    const conversation = await this.conversationGenerator.converse();

    this.conversationEvaluator = new ConversationEvaluator(this.config, this.logger, conversation, testCase);
    const conversationEvaluation = await this.conversationEvaluator.evaluateConversation();
    const extractedInformationEvaluation = await this.conversationEvaluator.evaluateExtractedInformation();

    return { conversation, evaluation: { conversation: JSON.parse(conversationEvaluation), information: extractedInformationEvaluation } };
  }

  async runTestSuite() {
    const testCases = fs.readdirSync(this.config.test_suite.dir).filter((file: string) => 
        file.endsWith('.json') && !file.endsWith('.example.json')
    );

    this.logger.info(`Running test suite`);
    this.logger.debug(`Running ${testCases.length} test cases`);
    for (const testFile of testCases) {
      const filePath = path.join(this.config.test_suite.dir, testFile);
      const testCase = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as TestCase;

      this.logger.info(`Running test case ${testFile}`);
      const testResult = await this.runTestCase(testCase);
      this.saveTestResult(testResult, testFile);
    }

    await this.conversationGenerator.disconnect();
  }
}

export default VoiceAITestBench;