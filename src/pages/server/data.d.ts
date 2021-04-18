export interface DirectV2rayNode {
    id: number;
    name: string;
    host: string;
}

export interface V2rayNodeVo {
    id: number;
    createTime: number;
    updateTime: number;
    name: string;
    host: string;
    ip: object;
    port: number;
    supportTls: boolean;
    protocol: string;
    level: number;
    magnification: number;
    speed: number;
    description: string;
    messageForAdmin: string;
    parentNodeId: number;
    parentName: string;
    parentHost: string;
    enable: boolean;
}

export interface V2rayNodeForUser {
    id: number;
    name: string;
    host: string;
    port: number;
    supportTls: boolean;
    protocol: string;
    level: number;
    magnification: number;
    speed: number;
    description: string;
    connectionNum: number;
    canUse: boolean;
}
