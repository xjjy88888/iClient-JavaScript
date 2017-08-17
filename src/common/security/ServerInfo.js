import SuperMap from '../SuperMap';
import {ServerType} from '../REST';
/**
 * @class SuperMap.ServerInfo
 * @classdesc 服务器信息(安全相关)，包含服务器类型，服务地址，token服务地址等
 * @param type -{string} 类型
 * @param options - {Object} 参数。
 */


export default class ServerInfo {
    /**
     * @member SuperMap.ServerInfo.prototype.type -{SuperMap.ServerType}
     * @description 服务器类型 如：http://supermapiserver:8090
     */
    type = null;

    /**
     * @member SuperMap.ServerInfo.prototype.server -{string}
     * @description 非必填，如：http://supermapiserver:8090/iserver/services/security/tokens.json
     */
    server = null;

    /**
     * @member SuperMap.ServerInfo.prototype.tokenServiceUrl -{string}
     * @description 非必填，如：http://supermapiserver:8092/web/mycontent/keys/register.json
     */
    tokenServiceUrl = null;

    /**
     * @member SuperMap.ServerInfo.prototype.keyServiceUrl -{string}
     * @description 非必填。
     */
    keyServiceUrl = null;

    constructor(type, options) {
        this.type = type || ServerType.ISERVER;
        SuperMap.Util.extend(this, options);
        if (!this.server) {
            console.error('server url require is not  undefined')
        }
        var patten = /http:\/\/([^\/]+)/i;
        this.server = this.server.match(patten)[0];

        var tokenServiceSuffix = "/services/security/tokens.json";
        if (this.type === ServerType.ISERVER && this.server.indexOf("iserver") < 0) {
            tokenServiceSuffix = "/iserver" + tokenServiceSuffix;
        }

        if (!this.tokenServiceUrl) {
            this.tokenServiceUrl = this.server + tokenServiceSuffix;
        }

        if (!this.keyServiceUrl) {
            if (this.type === ServerType.IPORTAL) {
                this.keyServiceUrl = this.server + "/web/mycontent/keys/register.json";
            } else if (this.type === ServerType.ONLINE) {
                this.keyServiceUrl = this.server + "/web/mycontent/keys.json";
            }
        }
    }

    CLASS_NAME = "SuperMap.ServerInfo"
}

SuperMap.ServerInfo = ServerInfo;
