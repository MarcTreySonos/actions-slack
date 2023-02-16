require('./sourcemap-register.js');/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 148:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Client = void 0;
const core = __importStar(__nccwpck_require__(105));
const github = __importStar(__nccwpck_require__(82));
const webhook_1 = __nccwpck_require__(739);
class Client {
    constructor() {
        if (process.env.GITHUB_TOKEN === undefined) {
            throw new Error('Specify secrets.GITHUB_TOKEN');
        }
        this.github = github.getOctokit(process.env.GITHUB_TOKEN);
        if (process.env.SLACK_WEBHOOK_URL === undefined) {
            throw new Error('Specify secrets.SLACK_WEBHOOK_URL');
        }
        this.webhook = new webhook_1.IncomingWebhook(process.env.SLACK_WEBHOOK_URL);
    }
    sendMessage(status, text) {
        return __awaiter(this, void 0, void 0, function* () {
            var color = '';
            switch (status) {
                case 'success':
                    color = 'good';
                    break;
                case 'failure':
                    color = 'danger';
                    break;
                case 'cancelled':
                    color = 'warning';
                    break;
                default:
                    throw new Error('The status must be success or failure or cancelled');
            }
            const payload = {
                text: text,
                attachments: [
                    {
                        color: color,
                        fields: yield this.fields(),
                    },
                ],
            };
            this.send(payload);
        });
    }
    fields() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.github === undefined) {
                throw Error('Specify secrets.GITHUB_TOKEN');
            }
            const { owner, repo } = github.context.repo;
            const { sha } = github.context;
            return [
                {
                    title: 'GitHub Actions',
                    value: `<https://github.com/${owner}/${repo}/commit/${sha}/checks|Workflow>`,
                }
            ];
        });
    }
    send(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            core.debug(JSON.stringify(github.context, null, 2));
            yield this.webhook.send(payload);
            core.debug('send message');
        });
    }
}
exports.Client = Client;


/***/ }),

/***/ 389:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core = __importStar(__nccwpck_require__(105));
const client_1 = __nccwpck_require__(148);
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let status = core.getInput('status', { required: true });
            status = status.toLowerCase();
            const success_text = core.getInput('success_text');
            const failure_text = core.getInput('failure_text');
            const cancelled_text = core.getInput('cancelled_text');
            core.debug(`status: ${status}`);
            core.debug(`success_text: ${success_text}`);
            core.debug(`failure_text: ${failure_text}`);
            core.debug(`cancelled_text: ${cancelled_text}`);
            const client = new client_1.Client();
            var message = '';
            switch (status) {
                case 'success':
                    message = success_text;
                    break;
                case 'failure':
                    message = failure_text;
                    break;
                case 'cancelled':
                    message = cancelled_text;
                    break;
                default:
                    throw new Error('You can specify success or failure or cancelled');
            }
            yield client.sendMessage(status, message);
        }
        catch (error) {
            let errorMessage = "Failed to do something exceptional";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            core.setFailed(errorMessage);
        }
    });
}
run();


/***/ }),

/***/ 105:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 82:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ }),

/***/ 739:
/***/ ((module) => {

module.exports = eval("require")("@slack/webhook");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __nccwpck_require__(389);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map