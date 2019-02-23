//
//  LoginStatus.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/22.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

struct LoginStatus: Decodable {
    let accessToken: String
    let user: User
    
    enum Key: String, CodingKey {
        case accessToken = "access_token"
        case user
    }
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: Key.self)
        self.accessToken = try container.decode(String.self, forKey: .accessToken)
        self.user = try container.decode(User.self, forKey: .user)
    }
}
