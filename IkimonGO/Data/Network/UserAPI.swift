//
//  AuthAPI.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/24.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

import Moya

enum AuthAPI {
    case login(email: String, password: String)
}

extension AuthAPI: TargetType {
    var baseURL: URL {
        return URL(string: "http://ikimongo-server-express.herokuapp.com")!
    }

    var path: String {
        switch self {
        case .login:
            return "/auth/token"
        }
    }

    var method: Moya.Method {
        switch self {
        case .login:
            return .post
        }
    }

    var sampleData: Data {
        switch self {
        case .login:
            let path = Bundle.main.path(forResource: "sample", ofType: "json")!
            return FileHandle(forReadingAtPath: path)!.readDataToEndOfFile()
        }
    }

    var task: Task {
        switch self {
        case .login(let email, let password):
            return .requestParameters(parameters: ["email": email, "password": password], encoding: URLEncoding.default)
        }
    }

    var headers: [String: String]? {
        return nil
    }
}
