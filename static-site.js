#!/usr/bin/env node
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticSite = void 0;
var s3 = require("aws-cdk-lib/aws-s3");
var s3deploy = require("aws-cdk-lib/aws-s3-deployment");
var cloudfront = require("aws-cdk-lib/aws-cloudfront");
var iam = require("aws-cdk-lib/aws-iam");
var constructs_1 = require("constructs");
var StaticSite = /** @class */ (function (_super) {
    __extends(StaticSite, _super);
    function StaticSite(parent, name) {
        var _this = _super.call(this, parent, name) || this;
        var cloudfrontOAI = new cloudfront.OriginAccessIdentity(_this, "JSCC-OAI");
        var siteBucket = new s3.Bucket(_this, "AWSReactShop", {
            bucketName: "aws-react-shop",
            websiteIndexDocument: "index.html",
            publicReadAccess: false,
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
        });
        siteBucket.addToResourcePolicy(new iam.PolicyStatement({
            actions: ["s3:GetObject"],
            effect: iam.Effect.ALLOW,
            resources: [siteBucket.arnForObjects("*")],
            principals: [
                new iam.CanonicalUserPrincipal(cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId),
            ],
        }));
        var distribution = new cloudfront.CloudFrontWebDistribution(_this, "JSCC-distribution", {
            originConfigs: [
                {
                    s3OriginSource: {
                        s3BucketSource: siteBucket,
                        originAccessIdentity: cloudfrontOAI,
                    },
                    behaviors: [
                        {
                            isDefaultBehavior: true,
                        },
                    ],
                },
            ],
        });
        new s3deploy.BucketDeployment(_this, "JSCC-Bucket-Deployment", {
            sources: [s3deploy.Source.asset("./dist")],
            destinationBucket: siteBucket,
            distribution: distribution,
            distributionPaths: ["/*"],
        });
        return _this;
    }
    return StaticSite;
}(constructs_1.Construct));
exports.StaticSite = StaticSite;
