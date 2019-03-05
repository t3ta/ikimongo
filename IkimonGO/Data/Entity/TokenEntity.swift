//
//  TokenEntity.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/22.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

struct TokenEntity: Decodable {
    let accessToken: String
    let user: UserEntity

    enum Key: String, CodingKey {
        case accessToken = "access_token"
        case user
    }

    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: Key.self)
        self.accessToken = try container.decode(String.self, forKey: .accessToken)
        self.user = try container.decode(UserEntity.self, forKey: .user)
    }
}
