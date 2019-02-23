//
//  RecordDataStore.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/23.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

import Moya
import RxSwift

enum RecordError: Error {
    case parseError
}

protocol RecordDataStoreProtocol {
    func getMyRecords(with accessToken: String) -> Observable<[Record]>
    func getRecord(by id: String, with accessToken: String) -> Observable<Record>
}

final class RecordDataStore: RecordDataStoreProtocol {
    func getMyRecords(with accessToken: String) -> Observable<[Record]> {
        let provider = MoyaProvider<RecordAPI>(plugins: [AuthPlugin(tokenClosure: { return accessToken })])
        
        return Observable<[Record]>.create({ (observer) -> Disposable in
            let _ = provider.rx
                .request(.get())
                .filterSuccessfulStatusCodes()
                .map({ (response) -> [Record]? in
                    return try? JSONDecoder().decode([Record].self, from: response.data)
                })
                .subscribe(onSuccess: { (records) in
                    if let records = records {
                        observer.onNext(records)
                    } else {
                        observer.onError(RecordError.parseError)
                    }
                }, onError: { (error) in
                    observer.onError(error)
                })
            
            return Disposables.create()
        })
    }
    
    func getRecord(by id: String, with accessToken: String) -> Observable<Record> {
        let provider = MoyaProvider<RecordAPI>(plugins: [AuthPlugin(tokenClosure: { return accessToken })])
        
        return Observable<Record>.create({ (observer) -> Disposable in
            let _ = provider.rx
                .request(.getById(id: id))
                .filterSuccessfulStatusCodes()
                .map({ (response) -> Record? in
                    return try? JSONDecoder().decode(Record.self, from: response.data)
                })
                .subscribe(onSuccess: { (record) in
                    if let record = record {
                        observer.onNext(record)
                    } else {
                        observer.onError(RecordError.parseError)
                    }
                }, onError: { (error) in
                    observer.onError(error)
                })
            
            return Disposables.create()
        })
    }
}
