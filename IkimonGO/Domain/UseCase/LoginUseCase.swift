//
//  LoginUseCase.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/22.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

import RxSwift

protocol LoginUseCaseProtocol {
    func checkAccessToken() -> Observable<String>
    func login(email: String, password: String) -> Observable<TokenEntity>
}

final class LoginUsecase: LoginUseCaseProtocol {
    private let repository: LoginRepositoryProtocol
    
    init(repository: LoginRepositoryProtocol) {
        self.repository = repository
    }
    
    func checkAccessToken() -> Observable<String> {
        return repository.getAccessToken()
    }
    
    func login(email: String, password: String) -> Observable<TokenEntity> {
        return repository.getToken(email: email, password: password)
    }
}
