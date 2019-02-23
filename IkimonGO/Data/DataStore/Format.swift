//
//  Format.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/23.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

struct Format {
    let name: String
    let elements: [FormatElement]
    
    struct FormatElement {
        let key: String
        let isRequired: Bool
    }
}
