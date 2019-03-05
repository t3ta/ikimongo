//
//  AuthPlugin.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/24.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

import Moya

protocol AuthorizedTargetType: TargetType {
    var needsAuth: Bool { get }
}

struct AuthPlugin: PluginType {
    let tokenClosure: () -> String?

    func prepare(_ request: URLRequest, target: TargetType) -> URLRequest {
        guard let token = tokenClosure(),
            let target = target as? AuthorizedTargetType,
            target.needsAuth else {
                return request
            }

        var request = request
        request.addValue("Bearer " + token, forHTTPHeaderField: "Authorization")
        return request
    }
}

extension MultiTarget: AuthorizedTargetType {
    public var needsAuth: Bool {
        guard let target = target as? AuthorizedTargetType else {
            return false
        }
        return target.needsAuth
    }
}
