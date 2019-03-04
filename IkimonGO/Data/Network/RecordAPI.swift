//
//  RecordAPI.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/24.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

import Moya

enum RecordAPI {
    case get()
    case getById(id: String)
}

extension RecordAPI: AuthorizedTargetType {
    var needsAuth: Bool {
        return true
    }

    var baseURL: URL {
        return URL(string: "http://ikimongo-server-express.herokuapp.com")!
    }

    var path: String {
        switch self {
        case .get:
            return "/records"
        case .getById(let id):
            return "/records/"+id
        }
    }

    var method: Moya.Method {
        switch self {
        case .get:
            return .get
        case .getById:
            return .get
        }
    }

    var sampleData: Data {
        switch self {
        case .get:
            let path = Bundle.main.path(forResource: "sample", ofType: "json")!
            return FileHandle(forReadingAtPath: path)!.readDataToEndOfFile()
        case .getById:
            let path = Bundle.main.path(forResource: "sample", ofType: "json")!
            return FileHandle(forReadingAtPath: path)!.readDataToEndOfFile()
        }
    }

    var task: Task {
        switch self {
        case .get:
            return .requestPlain
        case .getById:
            return .requestPlain
        }
    }

    var headers: [String: String]? {
        return nil
    }
}
