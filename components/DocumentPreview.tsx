"use client";

import React from "react";
import { DocType, BlankaFields, DavernostFields } from "@/lib/docx-fields";

interface DocumentPreviewProps {
  docType: DocType;
  blankaData: BlankaFields;
  davernostData: DavernostFields;
}

const Highlight = ({ children }: { children: React.ReactNode }) => (
  <span className="font-bold text-red-600 bg-red-50/80 px-1 py-0.5 rounded border border-red-200 transition-all">
    {children}
  </span>
);

export default function DocumentPreview({
  docType,
  blankaData,
  davernostData,
}: DocumentPreviewProps) {
  if (docType === "davernost") {
    return (
      <div
        id="docx-preview-container"
        className="w-full bg-white text-black text-[13px] leading-relaxed p-8 sm:p-12 font-serif shadow-paper border border-gray-200"
        style={{ minHeight: "297mm", boxSizing: "border-box" }}
      >
        {/* Header table */}
        <div className="border-b-2 border-emerald-800 pb-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center text-center">
            <div className="text-[11px] font-bold text-blue-900 leading-snug">
              O&apos;ZBEKISTON RESPUBLIKASI<br />
              FARG&apos;ONA VILOYATI DANGARA TUMANI<br />
              «MUSFIRA SAVDO TRANS» MCHJ
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full border-2 border-emerald-700 flex items-center justify-center font-bold text-emerald-800 text-lg">
                M
              </div>
            </div>
            <div className="text-[11px] font-bold text-blue-900 leading-snug">
              РЕСПУБЛИКА УЗБЕКИСТАН<br />
              ФЕРГАНСКАЯ ОБЛАСТЬ ДАНГАРИНСКИЙ РАЙОН<br />
              ООО «MUSFIRA SAVDO TRANS»
            </div>
          </div>
          <div className="text-[10px] text-center text-gray-700 mt-2">
            Республика Узбекистан, Ферганская область, ДАНГАРИНСКИЙ район, улица Саноат 2
            &nbsp;|&nbsp; ИНН: 305126811 &nbsp;|&nbsp; ОКЭД: 49410 &nbsp;|&nbsp; тел: +998916861345
          </div>
        </div>

        {/* Title */}
        <div className="text-center my-6">
          <h1 className="text-xl font-bold tracking-widest uppercase text-gray-900">
            ДОВЕРЕННОСТЬ
          </h1>
        </div>

        {/* Content body */}
        <div className="space-y-4 text-justify text-[13.5px] leading-relaxed">
          <p>
            Настоящая доверенность выдана:{" "}
            <Highlight>{davernostData.workerFio || "____________________"}</Highlight>
            &nbsp;&nbsp;&nbsp;&nbsp;паспорт:&nbsp;
            <Highlight>{davernostData.passport || "________"}</Highlight>
            &nbsp;выданный&nbsp;
            <Highlight>{davernostData.issuedDate || "__________"}</Highlight>
            &nbsp;года.&nbsp;Республика Узбекистан,&nbsp;
            <Highlight>{davernostData.issuedPlace || "________________"}</Highlight>
            &nbsp;РОВД, живущий по адресу: Республика Узбекистан,&nbsp;
            <Highlight>{davernostData.issuedPlace || "________________"}</Highlight>.
          </p>

          <p>
            Является представителем Ассоциации Международных Автомобильных перевозчиков Узбекистана{" "}
            <strong>ООО «MUSFIRA SAVDO TRANS»</strong> и осуществляет перевозки, а так же{" "}
            <strong>ООО «MUSFIRA SAVDO TRANS»</strong> удостоверяет, что водитель имеет право представлять интересы фирмы и иных организаций, подписывать договор возмездных услуг, поручительства, договор страхования, иные сопутствующие документы, необходимые для оформления ВТТ, МТТ, и имеет право подписи при составлении протокола и рассмотрении дела об административных правонарушениях и осуществлять все необходимые действия, связанные с выполнением данного поручения, при необходимости ведение административных правонарушений, а также оплаты административных штрафов.
          </p>

          <p className="pt-2">
            Настоящая доверенность вступает в силу с момента подписания и действует с&nbsp;
            <Highlight>
              «{davernostData.validFrom?.split(".")[0] || "24"}» {davernostData.validFrom?.split(".")[1] || "08"}.{davernostData.validFrom?.split(".")[2] || "2026"}г
            </Highlight>
            &nbsp;по&nbsp;
            <Highlight>
              «{davernostData.validUntil?.split(".")[0] || "23"}» {davernostData.validUntil?.split(".")[1] || "08"}.{davernostData.validUntil?.split(".")[2] || "2028"}г
            </Highlight>.
          </p>
        </div>

        {/* Signatures */}
        <div className="mt-14 flex items-end justify-between pt-6">
          <div>
            <div className="font-bold text-sm">ООО «MUSFIRA SAVDO TRANS» директор:</div>
            <div className="mt-10 font-bold">Б.П. МАМАЖОНОВ</div>
          </div>
          <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs">
            М.П.
          </div>
        </div>
      </div>
    );
  }

  // Blanka: Трудовой Контракт
  return (
    <div
      id="docx-preview-container"
      className="w-full bg-white text-black text-[12.5px] leading-normal p-8 sm:p-12 font-serif shadow-paper border border-gray-200"
      style={{ minHeight: "297mm", boxSizing: "border-box" }}
    >
      {/* Title */}
      <div className="text-center mb-6">
        <h1 className="text-base sm:text-lg font-bold uppercase tracking-wide">
          ТРУДОВОЙ КОНТРАКТ № <Highlight>{blankaData.contractNumber || "21"}</Highlight>/2026
        </h1>
        <div className="flex justify-between text-xs font-semibold text-gray-700 mt-2 px-2">
          <span>г. Коканд</span>
          <span>{blankaData.startDate || "«25» 08. 2026"} года</span>
        </div>
      </div>

      <div className="space-y-3 text-justify text-[12.5px] leading-relaxed">
        <p>
          Мы, нижеподписавшиеся Союз частных международных автомобильных Перевозчиков{" "}
          <strong>ООО «MUSFIRA SAVDO TRANS»</strong>, именуемый в дальнейшем «Компания», в лице Генерального директора{" "}
          <strong>Б. Мамажонова</strong>, с одной стороны, и гражданин(ка)&nbsp;
          <Highlight>{blankaData.workerFio || "____________________"}</Highlight>,
          именуемый(ая) в дальнейшем «Водитель-международник», с другой стороны, заключили настоящий контракт о нижеследующем:
        </p>

        <div>
          <h2 className="font-bold text-center text-xs uppercase mt-3 mb-1">
            1. ПРЕДМЕТ КОНТРАКТА
          </h2>
          <p>
            1.1 Водитель принимается на работу в ООО «MUSFIRA SAVDO TRANS» на должность водителя для осуществления международных автомобильных грузоперевозок.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-center text-xs uppercase mt-3 mb-1">
            2. СРОК ДЕЙСТВИЯ КОНТРАКТА
          </h2>
          <p>
            2.1 Настоящий контракт заключен на срок с&nbsp;
            <Highlight>{blankaData.startDate || "«25» 08. 2026"}</Highlight>
            &nbsp;года по&nbsp;
            <Highlight>{blankaData.endDate || "«24» 08. 2028"}</Highlight>
            &nbsp;года.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-center text-xs uppercase mt-3 mb-1">
            8. АДРЕСА И РЕКВИЗИТЫ СТОРОН
          </h2>
          <div className="grid grid-cols-2 gap-4 mt-2 pt-2 border-t border-gray-300">
            <div>
              <div className="font-bold mb-1">КОМПАНИЯ:</div>
              <div>ООО «MUSFIRA SAVDO TRANS»</div>
              <div>Адрес: Республика Узбекистан, Ферганская область, Дангаринский район, ул. Саноат 2</div>
              <div>ИНН: 305126811 | ОКЭД: 49410</div>
              <div className="mt-6 font-semibold">
                Ген. Директор: ____________ Б. Мамажонов
              </div>
            </div>

            <div>
              <div className="font-bold mb-1">ВОДИТЕЛЬ:</div>
              <div>
                Ф.И.О.: <Highlight>{blankaData.workerFio}</Highlight>
              </div>
              <div>
                Паспорт: <Highlight>{blankaData.passport}</Highlight>
              </div>
              <div>
                Выдан: <Highlight>{blankaData.issuedPlace}</Highlight> РОВД
              </div>
              <div>
                Дата выдачи: <Highlight>{blankaData.issuedDate}</Highlight>
              </div>
              <div className="mt-6 font-semibold">
                Подпись: ________________________
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
