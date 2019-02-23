//
//  Result.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/22.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

enum Result<T> {
    case success(T)
    case failure(Error)
}
