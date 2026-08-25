"use client";

import React from "react";
import { DocType, BlankaFields, DavernostFields } from "@/lib/docx-fields";

interface DocumentPreviewProps {
  docType: DocType;
  blankaData: BlankaFields;
  davernostData: DavernostFields;
}

const Red = ({ children }: { children: React.ReactNode }) => (
  <span className="red-field font-semibold text-red-600 bg-red-50 px-1 py-0.5 rounded border border-red-200 inline-block transition-all">
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
        className="w-full bg-white text-black text-[13px] leading-relaxed p-8 sm:p-14 font-serif shadow-paper border border-gray-300"
        style={{
          minHeight: "297mm",
          boxSizing: "border-box",
          fontFamily: "'Times New Roman', Times, serif",
        }}
      >
        {/* Header Table Exactly as in DOCX */}
        <div className="border-b-[3px] border-emerald-700 pb-3 mb-6">
          <table className="w-full text-center border-collapse">
            <tbody>
              <tr>
                <td className="w-5/12 align-top text-left text-[11px] font-bold text-[#1F497D] leading-tight pr-2">
                  <div className="text-center font-normal text-[10px] mb-1">9 M</div>
                  <div>O’ZBEKISTON RESPUBLIKASI</div>
                  <div>FARG’ONA VILOYATI DANGARA TUMANI</div>
                  <div>«MUSFIRA SAVDO TRANS» MCHJ</div>
                </td>
                <td className="w-2/12 align-middle text-center">
                  <div className="w-10 h-10 mx-auto rounded-full border-2 border-emerald-700 flex items-center justify-center font-bold text-emerald-800 text-lg">
                    M
                  </div>
                </td>
                <td className="w-5/12 align-top text-right text-[11px] font-bold text-[#1F497D] leading-tight pl-2">
                  <div>РЕСПУБЛИКА УЗБЕКИСТАН</div>
                  <div>ФЕРГАНСКАЯ ОБЛАСТЬ ДАНГАРАЙСКИЙ РАЙОН</div>
                  <div>ООО «MUSFIRA SAVDO TRANS»</div>
                </td>
              </tr>
              <tr>
                <td colSpan={3} className="pt-2 text-[10.5px] text-center text-gray-800 font-sans">
                  <strong>ООО «MUSFIRA SAVDO TRANS»</strong>&nbsp; Республика Узбекистан, Ферганская область, ДАНГАРАЙСКИЙ район , улица саноат 2 &nbsp; ИНН: 305126811, ОКэд: 49410, тел: +998916861345 150500
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Title */}
        <div className="text-center my-6">
          <h1 className="text-lg font-bold tracking-widest uppercase">
            ДОВЕРЕННОСТЬ
          </h1>
        </div>

        {/* Paragraph 1 */}
        <div className="text-justify text-[13px] leading-relaxed space-y-4">
          <p className="indent-8">
            Настоящая доверенность выдана:&nbsp;
            <Red>{davernostData.workerFio || "ABDUKADIROV BAKHTIYOR IMOMALIEVICH"}</Red>
            &nbsp;&nbsp;&nbsp;&nbsp;паспорт&nbsp;&nbsp;&nbsp;&nbsp;
            <Red>{davernostData.passport || "FA 2786135"}</Red>
            &nbsp;выданный&nbsp;&nbsp;
            <Red>{davernostData.issuedDate || "12.05.2021г"}</Red>
            &nbsp;года.&nbsp;Республика&nbsp;&nbsp;Узбекистан&nbsp;&nbsp;
            <Red>{davernostData.issuedPlace || "Ферганская область"}</Red>
            &nbsp;РОВД ,&nbsp;&nbsp;&nbsp;&nbsp;живущий&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;пo&nbsp;&nbsp;&nbsp;адресу:&nbsp;&nbsp;&nbsp;Республика&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Узбекистан&nbsp;&nbsp;
            <Red>{davernostData.issuedPlace || "Ферганская область"}</Red>.
          </p>

          {/* Paragraph 2 */}
          <p className="indent-8">
            Является представителем&nbsp;&nbsp;&nbsp;Ассоциации&nbsp;&nbsp;Международных&nbsp;&nbsp;Автомобильных&nbsp;&nbsp;перевозчиков Узбекистана&nbsp;&nbsp;ООО “MUSFIRA&nbsp;&nbsp;SAVDO TRANS”&nbsp;&nbsp;и осуществляет&nbsp;&nbsp;перевозки,&nbsp;&nbsp;а так же&nbsp;&nbsp;ООО “ MUSFIRA&nbsp;&nbsp;SAVDO TRANS “ удостоверяет,&nbsp;&nbsp;водитель имеет право&nbsp;&nbsp;представлять интересы фырми&nbsp;&nbsp;и&nbsp;&nbsp;иных&nbsp;&nbsp;организаций&nbsp;&nbsp;подписывать договор&nbsp;&nbsp;возмездных&nbsp;&nbsp;услуг&nbsp;&nbsp;поручительства договор&nbsp;&nbsp;строхавания&nbsp;&nbsp;иные&nbsp;&nbsp;сопутствуюшие&nbsp;&nbsp;документы&nbsp;&nbsp;необходимые&nbsp;&nbsp;для оформиления&nbsp;&nbsp;ВТТ&nbsp;&nbsp;МТТ,  и имеет право  подписи  при  составлении протокола  и расмотрении  дела  об  административных   нарушениях  и осуществлять  все необходимые  действия  связанные  с  выполнением  данного  поручения, при  нсобходимости ведение административних правонарушении, а также оплаты административных штрафов.
          </p>

          {/* Paragraph 3 (Dates) */}
          <p className="indent-8">
            Настоящий доверенность&nbsp;&nbsp;вступает в силу с момента подписания и действует&nbsp;&nbsp;с&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Red>
              «{davernostData.validFrom?.split(".")[0] || "24"}» {davernostData.validFrom?.split(".")[1] || "08"}.{davernostData.validFrom?.split(".")[2] || "2026"}.г&nbsp;&nbsp;по&nbsp;&nbsp;«{davernostData.validUntil?.split(".")[0] || "23"}» {davernostData.validUntil?.split(".")[1] || "08"}.{davernostData.validUntil?.split(".")[2] || "2028"}.г
            </Red>
          </p>
        </div>

        {/* Director Signature */}
        <div className="mt-16 flex items-center justify-between text-[13px]">
          <div>
            <strong>ООО “MUSFIRA&nbsp;&nbsp;SAVDO TRANS” директор :</strong>
          </div>
          <div>
            <strong>Б.П. МАМАЖОНОВ</strong>
          </div>
        </div>
      </div>
    );
  }

  // Blanka: Трудовой Контракт (100% asl DOCX matnlari bilan)
  return (
    <div
      id="docx-preview-container"
      className="w-full bg-white text-black text-[12px] leading-snug p-8 sm:p-12 font-serif shadow-paper border border-gray-300 space-y-6"
      style={{
        minHeight: "297mm",
        boxSizing: "border-box",
        fontFamily: "'Times New Roman', Times, serif",
      }}
    >
      {/* ─── 1-QISM: ТРУДОВОЙ КОНТРАКТ ─── */}
      <div className="space-y-3 pb-8 border-b-2 border-dashed border-gray-300">
        <div className="text-center">
          <h1 className="text-base font-bold uppercase">
            ТРУДОВОЙ КОНТРАКТ №<Red>{blankaData.contractNumber || "21"}</Red>/2026
          </h1>
          <div className="text-left text-xs font-semibold mt-1">г.Дангара</div>
        </div>

        <div>
          <h2 className="font-bold text-center text-xs uppercase mt-2 mb-1">
            I.ОБЩЕЕ ПОЛОЖЕНИЕ
          </h2>
          <p className="text-justify indent-6">
            Мы, нижеподписавшиеся Союз частных международных автомобильных Перевозчиков ООО «MUSFIRA SAVDO TRANS» в лице председателя Мамажонов .Б в дальнейшем именуемый «КОМПАНИЯ» и именуемый в дальнейшем <Red>{blankaData.workerFio || "ABDUKADIROV BAKHTIYOR IMOMALIEVICH"}</Red> «ВОДИТЕЛЬ, ЭКСПЕДИТОР, КАССИР» заключили настоящее соглашение о том, что «КОМПАНИЯ» предоставляет «ВОДИТЕЛЮ» работу по международной перевозке грузов с применением книжки МДП.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-center text-xs uppercase mt-2 mb-1">
            II. ОБЯЗАННОСТИ СТОРОН:
          </h2>
          <p className="font-bold">2.1 Обязанности «КОМПАНИИ»:</p>
          <ul className="list-disc pl-6 space-y-1 text-justify">
            <li>Обеспечить «ВОДИТЕЛЯ» необходимой документацией для осуществления международной перевозки грузов и перегона Автомобилей (книжка МДП, накладная CMR, путевой лист) и необходимой информацией, касающейся данной перевозки .</li>
            <li>По желанию «ВОДИТЕЛЯ» может выполнять и другие услуги, входящие в сферу его деятельности по Уставу.</li>
            <li>Производить оплату труда «ВОДИТЕЛЯ» за месяц или за каждую отдельную перевозку на договорной основе. Сумма будет зависеть от расстояния перевозки и других специфических условий.</li>
            <li>Уполномочить «ВОДИТЕЛЯ» купить и перегонять автомобиль из других государств.</li>
            <li>Выдавать доверенность «ВОДИТЕЛЯ» на право использования книжки МДП.</li>
          </ul>

          <p className="font-bold mt-2">2.2 Обязанности «ВОДИТЕЛЯ»:</p>
          <ul className="list-disc pl-6 space-y-1 text-justify">
            <li>Использовать книжку МДП и другие сопроводительные документы строго по назначению, не передовая их третьим лицам.</li>
            <li>Обеспечивать сохранность грузов, книжки МДП и других сопроводительных документов.</li>
            <li>Обеспечивать контроль за правильным заполнением таможенными органами Всех реквизитов книжки МДП, наличием печати и движением отрывных листов.</li>
            <li>Обеспечивать своевременную сдачу книжки МДП и других сопроводительных документов «КОМПАНИИ» (в течении двух недель после завершения рейса) .</li>
          </ul>
          <p className="mt-1 text-justify">
            <strong>2.3</strong> Никогда не перевозить алкогольные или табачные изделия за исключением пива, вина или табака, или в случаи дорожной аварии, или утери перевозимого груза «ВОДИТЕЛЬ» полностью отвечает за ущерб.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-center text-xs uppercase mt-2 mb-1">
            III. ПРАВА СТОРОН.
          </h2>
          <p className="font-bold">3.1 «КОМПАНИЯ» имеет право:</p>
          <p className="text-justify pl-4">
            - Отстранить от работы «ВОДИТЕЛЯ» нарушившего обязательство по использованию книжки МДП (нарушение таможенных правил, утере книжки МДП или передаче её третьему лицу и т.д.)<br />
            - Не выдавать «Водителю» книжку МДП, если есть сомнения в его чистоплотности.
          </p>
          <p className="font-bold mt-1">3.2 «ВОДИТЕЛЬ» имеет право:</p>
          <p className="text-justify pl-4">
            - Отказаться от перевозки груза(ов) если это угрожает жизни и здоровью людей, безопасности дорожного движения.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-center text-xs uppercase mt-2 mb-1">
            IV. СРОК ДЕЙСТВИЯ КОНТРАКТА
          </h2>
          <p className="text-justify">
            <strong>4.1</strong> Настоящий контракт вступает в силу с момента его подписания сторонами. Является действительным в течении на срок лицензии и может быть расторгнуто до окончания срока действия контракта по письменному заявлению одной из сторон после предоставления «ВОДИТЕЛЮ» всех принятых к перевозке документов.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-center text-xs uppercase mt-2 mb-1">
            V. АДРЕСА И ПОДПИСИ СТОРОН
          </h2>
          <div className="grid grid-cols-2 gap-4 mt-2 text-[11.5px] border-t pt-2">
            <div>
              <div className="font-bold">КОМПАНИЯ</div>
              <div>ООО «MUSFIRA SAVDO TRANS»</div>
              <div>Адрес: Республика Узбекистан</div>
              <div>Ферганская область, Дангаринский район Саноат № 2</div>
              <div>ИНН: 305126811 | ОКЭД: 49410</div>
              <div className="mt-4">
                Ген. Директор : ___________________________Б. Мамажонов.
              </div>
            </div>
            <div>
              <div className="font-bold">ВОДИТЕЛЬ</div>
              <div>Ф.И.О.: <Red>{blankaData.workerFio}</Red></div>
              <div>Паспорт: <Red>{blankaData.passport}</Red></div>
              <div>Выдан: <Red>{blankaData.issuedPlace}</Red> РОВД</div>
              <div>Дата: <Red>{blankaData.issuedDate}</Red></div>
              <div className="mt-4">
                Подпись: ________________________
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── 2-QISM: ДОГОВОР ─── */}
      <div className="space-y-3 pt-2">
        <div className="text-center">
          <h1 className="text-base font-bold uppercase">
            ДОГОВОР № <Red>{blankaData.contractNumber || "21"}</Red>/ 2026
          </h1>
          <div className="text-left text-xs font-semibold mt-1">г. Дангара</div>
        </div>

        <p className="text-justify indent-6 text-[12px]">
          ООО«MUSFIRA SAVDO TRANS» именуемое в дальнейшем «КОМПАНИЯ» в лице директора Б, Мамажонов действующего на основании Устава с одной стороны <Red>{blankaData.directorFio || "SOBIROV DAVLATBEK ATABEKOVICH"}</Red> именуемого в дальнейшем «ИСПОЛЬЗОВАТЕЛЬ» в лице ВОДИТЕЛЬ, ЭКСПЕДИТОР, КАССИР действующего на основании ТРУДОВОГО КОНТРАКТА с другой стороны заключили настоящий договор о нижеследующем:
        </p>

        <div>
          <h2 className="font-bold text-center text-xs uppercase mt-2 mb-1">
            1. ПРЕДМЕТ ДОГОВОРА
          </h2>
          <p className="text-justify text-[11.5px]">
            1.1 Настоящий договор определяет удовлетворения спроса юридических и физических лиц в автомобильном транспорте. Обеспечение юридических и частных владельцев автотранспортных средств равными условиями труда и осуществление их на рынке автотранспортных услуг.<br />
            1.2 «КОМПАНИЯ» обязуется обеспечивать книжками МДП, а «ИСПОЛЬЗОВАТЕЛЬ» соблюдать правила их использования.<br />
            1.3 Количество и характеристики книжек МДП согласовываются сторонами.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-center text-xs uppercase mt-2 mb-1">
            2. ПОРЯДОК ВЫДАЧИ И СДАЧИ КНИЖЕК МДП
          </h2>
          <p className="text-justify text-[11.5px]">
            2.1 Книжка МДП действительна в течении 60 дней со дня выдачи для предоставления таможню место отправки.<br />
            2.2 Книжка МДП должна быть возвращена «КОМПАНИИ» в течении 15 дней после оформления в таможне места назначения или окончания срока действия.<br />
            2.3 Дата поставки считается дата выдачи книжек МДП со склада «КОМПАНИИ».
          </p>
        </div>

        <div>
          <h2 className="font-bold text-center text-xs uppercase mt-2 mb-1">
            3. ПОРЯДОК ОПЛАТЫ.
          </h2>
          <p className="text-justify text-[11.5px]">
            3.1 Расчёты «КОМПАНИЯ» и «ИСПОЛЬЗОВАТЕЛЬ» производится по факту реализации книжек МДП (100% предоплата).<br />
            3.2 «ИСПОЛЬЗОВАТЕЛЬ» обязуется перед получением книжек МДП уплатить все расходы в пользу «КОМПАНИЯ» установленный «КОМПАНИЕЙ»:<br />
            а) вступительный взнос 50000 сум;&nbsp;&nbsp; б) ежегодный членский взнос 50000сум;&nbsp;&nbsp; в) расходы на содержание 200000сум;<br />
            г) стоимость книжек МДП-120 $ США установленный AIRCUZ.<br />
            3.3 «КОМПАНИЯ» за средства «ИСПОЛЬЗОВАТЕЛЯ» обеспечивает его необходимыми документами и оформление лицензии на осуществление автотранспортных перевозок.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-center text-xs uppercase mt-2 mb-1">
            6. СРОК ДЕЙСТВИЯ ДОГОВОРА
          </h2>
          <p className="text-justify text-[11.5px]">
            6.1 Настоящий договор вступает в силу с момента подписания и действует по&nbsp;
            <Red>{blankaData.startDate || "«25» 08. 2026"} года</Red>&nbsp;
            <Red>{blankaData.endDate || "«24» 08. 2028"} года</Red>.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-center text-xs uppercase mt-2 mb-1">
            8. АДРЕСА И РЕКВИЗИТЫ СТОРОН
          </h2>
          <div className="grid grid-cols-2 gap-4 mt-2 text-[11.5px] border-t pt-2">
            <div>
              <div className="font-bold">КОМПАНИЯ</div>
              <div>ООО «MUSFIRA SAVDO TRANS»</div>
              <div>Адрес: Республика Узбекистан</div>
              <div>Ферганская область, Дангаринский район Саноат № 2</div>
              <div>ИНН: 305126811 | ОКЭД: 49410</div>
              <div className="mt-4">
                Ген. Директор : ___________________________Б. Мамажонов.
              </div>
            </div>
            <div>
              <div className="font-bold">ВОДИТЕЛЬ</div>
              <div>Ф.И.О.: <Red>{blankaData.workerFio}</Red></div>
              <div>Паспорт: <Red>{blankaData.passport}</Red></div>
              <div>Выдан: <Red>{blankaData.issuedPlace}</Red> РОВД</div>
              <div>Дата: <Red>{blankaData.issuedDate}</Red></div>
              <div className="mt-4">
                Подпись: ________________________
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
