/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2021-05-06 13:28:16
 * @LastEditors: qingyang
 * @LastEditTime: 2021-05-07 17:37:38
 */

var util = require('util');
var STS = require('@baiducloud/sdk').STS;
var kCredentials = {
    ak: '4c99dd1c0ddb4af0866c55e5393c342',
    sk: '4387648add88450e87396821f2749a'
};

function buildStsResponse() {
    var stsClient = new STS({
        credentials: kCredentials,
        region: 'bj'
    });
    return stsClient.getSessionToken(60 * 60 * 24, {
        accessControlList: [{
            service: 'bce:bos',
            resource: ['liu-test/*'],
            region: '*',
            effect: 'Allow',
            permission: ['READ', 'WRITE']
        }]
    }).then(function (response) {
        var body = response.body;
        return {
            AccessKeyId: body.accessKeyId,
            SecretAccessKey: body.secretAccessKey,
            SessionToken: body.sessionToken,
            Expiration: body.expiration
        };
    });
}
module.exports = {
    'GET /api/getBaidu': async (ctx, next) => {
        const query = ctx.query;
        const payload = await buildStsResponse();
        console.log(JSON.stringify(payload))
        ctx.response.body = {
            code: 10000,
            data: payload,
            msg: '成功'
        }
    }
    
}


