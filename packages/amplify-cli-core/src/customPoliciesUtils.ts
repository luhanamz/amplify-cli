import { Fn, IAM } from "cloudform-types";

export type CustomIAMPolicies = {
    policies:  CustomIAMPolicy[];
}

export type CustomIAMPolicy = {
    Action: string[];
    Effect: string;
    Resource: string[];
}


export const CustomIAMPoliciesSchema = {
    type : "object",
    properties: {
        policies: {type: "array", minItems: 1, items: {type: "object"}}
    },
    required: ["policies"],
    additionalProperties: false
}

export const CustomIAMPolicySchema = {
        type: "object",
        properties: {
            Action: {type: "array", items: {type: "string"}, nullable: false},
            Effect: {type: "string", items: {type: "string"}, nullable: true, default: "Allow"},
            Resource: {type: "array", items: {type: "string"}, minItems: 1, nullable: false},
        },
        required: ["Resource", "Action"],
        additionalProperties: false
}

export const customExecutionPolicyForFunction = new IAM.Policy({
    PolicyName: 'custom-lambda-execution-policy',
    Roles: [
      Fn.Ref('LambdaExecutionRole')
    ],
    PolicyDocument: {
      Version: '2012-10-17',
      Statement: []
    }
  }).dependsOn(['LambdaExecutionRole']);

export const customExecutionPolicyForContainer = new IAM.Policy({
    PolicyDocument: {
        Statement: [
        ],
        Version: '2012-10-17'
    },
    PolicyName: 'CustomExecutionPolicyForContainer',
    Roles: [
    ]
  });



