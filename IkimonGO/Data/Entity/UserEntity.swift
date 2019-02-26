//
//  User.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/24.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

import Foundation

struct UserEntity: Decodable {
    let id: String
    let name: String
    let email: String
    
    enum Key: String, CodingKey {
        case id = "_id"
        case name
        case email
    }
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: Key.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.name = try container.decode(String.self, forKey: .name)
        self.email = try container.decode(String.self, forKey: .email)
    }
}
